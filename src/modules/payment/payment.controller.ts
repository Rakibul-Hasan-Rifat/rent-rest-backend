import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import AppError from "../../utils/app-error";
import Stripe from "stripe";
import stripe from "../../lib/stripe";
import envVars from "../../config/envVars";
import { completePayment, createCheckoutSession } from "./payment.service";
import sendResponse from "../../utils/send-response";
import prisma from "../../lib/prisma";

const checkout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await createCheckoutSession(req.user?.id as string, req.params.rentalId as string);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Payment is successful.",
        data: result,
        error: null
    })
})

const webhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { ["stripe-signature"]: signature } = req.headers

    if (!signature) throw new AppError(400, "Missing stripe signature");

    let event: Stripe.Event;
    event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        envVars.stripe_webhook_secret
    )

    const session = event.data.object as { id: string, metadata?: { rentalId: string } }

    const rentalId = session.metadata?.rentalId

    if (rentalId) {
        if (event.type === "checkout.session.completed") {
            console.log("ready for complete payment");
            
            await completePayment(rentalId, session.id)
        } else if (event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed") {
            await prisma.payment.update({
                where: { rentalRequestId: rentalId, status: "PENDING" },
                data: { status: "FAILED" }
            })
        }
    }

    res.json({received: true})
})

export { checkout, webhook }