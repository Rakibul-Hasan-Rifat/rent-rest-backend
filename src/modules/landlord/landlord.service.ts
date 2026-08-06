import { Prisma, RentalRequestStatus } from "../../../prisma/generated/prisma/client"
import prisma from "../../lib/prisma"

const insertPropertyIntoDb = async (payload: Prisma.PropertyCreateInput) => {

    const response = await prisma.property.create({ data: { ...payload } })

    return response
}

const updatePropertyByIdIntoDb = async (propertyId: string, payload: Prisma.PropertyUpdateInput) => {

    const response = await prisma.property.update({
        where: {
            id: propertyId
        },
        data: {
            ...payload
        }
    })

    return response
}

const deletePropertyByIdFromdb = async (propertyId: string) => {
    await prisma.property.delete({
        where: {
            id: propertyId
        }
    })

    return null
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

const landlordServices = {
    insertPropertyIntoDb,
    updatePropertyByIdIntoDb,
    deletePropertyByIdFromdb,
    retrieveRentalByLandlord,
    updateRentalStatusIntoDb
}

export default landlordServices;