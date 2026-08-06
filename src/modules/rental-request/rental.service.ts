import { Prisma, RentalRequestStatus } from "../../../prisma/generated/prisma/client"
import prisma from "../../lib/prisma"

const retrieveRentalsFromDb = async () => {
    const response = await prisma.rentalRequest.findMany()
    return response
}

const insertRentalsIntoDb = async (payload: Prisma.RentalRequestCreateInput) => {
    const response = await prisma.rentalRequest.create({ data: { ...payload } })
    return response
}

const retrieveRentalById = async (rentalId: string) => {
    const response = await prisma.rentalRequest.findUniqueOrThrow({where: {id: rentalId}})
    return response
}

const rentalServices = {
    retrieveRentalsFromDb,
    insertRentalsIntoDb,
    retrieveRentalById
}

export default rentalServices