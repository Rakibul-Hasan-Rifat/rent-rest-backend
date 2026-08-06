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

const retrieveRentalByLandlord = async (landlordId: string) => {
    const response = await prisma.rentalRequest.findMany({where: {property: {landlordId}}, include: {property: true}})
    return response
}

const updateRentalStatusIntoDb = async (rentalId: string, status: RentalRequestStatus) => {
    const response = await prisma.rentalRequest.update({
        where: { id: rentalId },
        data: { status }
    })
    return response
}

const rentalServices = {
    retrieveRentalsFromDb,
    insertRentalsIntoDb,
    retrieveRentalById,
    retrieveRentalByLandlord,
    updateRentalStatusIntoDb
}

export default rentalServices