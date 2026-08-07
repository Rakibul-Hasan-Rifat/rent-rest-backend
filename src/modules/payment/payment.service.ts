import Stripe from "stripe";
import prisma from "../../lib/prisma"
import stripe from "../../lib/stripe";
import AppError from "../../utils/app-error"
import { PaymentStatus } from "../../../prisma/generated/prisma/enums";

export const createCheckoutSession = async (renterId: string, rentalId: string) => {
    const rental = await prisma.rentalRequest.findUnique({
        where: { id: rentalId },
        include: { property: true, payment: true, tenant: true }
    })    
    
    if (!rental) throw new AppError(404, "Rental request not found");
    
    if (rental.tenantId !== renterId) throw new AppError(403, "You are not authorized to make payment for this rental request");

    if (rental.status !== "APPROVED") throw new AppError(400, "Rental request is not approved for payment");

    if (rental.payment?.status === "COMPLETED") throw new AppError(400, "Payment for this rental request has already been completed");

    if (!rental.property) throw new AppError(404, "Property not found for this rental request");

    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({
        mode: "payment",
        cancel_url: "http://localhost:3000/payment/cancel",
        success_url: "http://localhost:3000/payment/success",
        metadata: {
            rentalId: rental.id,
            renterId: rental.tenantId,
            propertyId: rental.propertyId
        },
        line_items: [{
            quantity: 1,
            price_data: {
                currency: "bdt",
                unit_amount: Number(rental.property.price) * 100,
                product_data: {
                    name: rental.property.title
                }
            }
        }],
    })

    const payment = await prisma.payment.upsert({
        where: { rentalRequestId: rental.id },
        create: {
            rentalRequestId: rental.id,
            amount: session.amount_total ? session.amount_total / 100 : 0,
            method: session.payment_method_types[0] || "unknown",
            transactionId: session.id
        },
        update: {
            transactionId: session.id,
            status: PaymentStatus.PENDING
        }
    })

    return { checkoutUrl: session.url, paymentId: payment.id }

}

export const completePayment = async (rentalRequestId: string, transactionId: string) => {
    const payment = await prisma.payment.findUnique({ where: { rentalRequestId } })
    const rentalRquest = await prisma.rentalRequest.findUnique({ where: { id: rentalRequestId } })

    if (!payment) {
        console.log("payment not found");
        
        throw new AppError(404, "No payment is found with this rental-request-id")
    }

    if (payment?.status === "COMPLETED") {
        console.log("payment completed");
        
        return
    }

        console.log("payment success");
        
    await prisma.$transaction([
        prisma.payment.update({
            where: { rentalRequestId },
            data: { status: "COMPLETED", transactionId }
        }),
        prisma.rentalRequest.update({
            where: { id: rentalRequestId },
            data: { status: "ACTIVE" }
        }),
        prisma.property.update({
            where: { id: rentalRquest?.propertyId as string },
            data: { status: "RENTED" }
        })
    ])
}