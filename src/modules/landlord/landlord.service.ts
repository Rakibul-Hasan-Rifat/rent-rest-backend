import { Prisma, RentalRequestStatus } from "../../../prisma/generated/prisma/client"
import prisma from "../../lib/prisma"
import AppError from "../../utils/app-error"

const insertPropertyIntoDb = async (payload: Prisma.PropertyCreateInput) => {

    const response = await prisma.property.create({ data: { ...payload } })

    return response
}

const getPropertiesFromDb = async (landlordId: string) => {
    const response = await prisma.property.findMany({ where: { landlordId } })

    return response;
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

const deletePropertyByIdFromdb = async (landlordId: string, propertyId: string) => {

    const property = await prisma.property.findFirst({ where: { id: propertyId } })

    if (!property) {
        throw new AppError(404, "Property not found");
    }

    if (property?.landlordId !== landlordId) {
        throw new AppError(403, "Permission denied for you.")
    }

    await prisma.property.delete({
        where: {
            id: propertyId
        }
    })

    return null
}

const retrieveRentalByLandlord = async (landlordId: string) => {
    const response = await prisma.rentalRequest.findMany({ where: { property: { landlordId } }, include: { property: true } })
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
    getPropertiesFromDb,
    updatePropertyByIdIntoDb,
    deletePropertyByIdFromdb,
    retrieveRentalByLandlord,
    updateRentalStatusIntoDb
}

export default landlordServices;