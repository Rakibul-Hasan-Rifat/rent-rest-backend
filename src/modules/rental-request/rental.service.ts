import { Prisma } from "../../../prisma/generated/prisma/client"
import prisma from "../../lib/prisma"
import AppError from "../../utils/app-error"
import RentalRequestInsertPayload from "./rental.interface"

const retrieveRentalsFromDb = async () => {
    const response = await prisma.rentalRequest.findMany()
    return response
}

const insertRentalsIntoDb = async (payload: RentalRequestInsertPayload) => {

    const overlap = await prisma.rentalRequest.findFirst({
        where: {
            propertyId: payload.propertyId,
            startDate: { lte: payload.endDate },
            endDate: { gte: payload.startDate }
        }
    })

    if (overlap) {
        throw new AppError(409, "Overlapping rental request exists for this property.")
    }

    const response = await prisma.rentalRequest.create({ data: { ...payload } })
    return response
}

const retrieveRentalById = async (rentalId: string) => {
    const response = await prisma.rentalRequest.findUniqueOrThrow({ where: { id: rentalId } })
    return response
}

const rentalServices = {
    retrieveRentalsFromDb,
    insertRentalsIntoDb,
    retrieveRentalById
}

export default rentalServices