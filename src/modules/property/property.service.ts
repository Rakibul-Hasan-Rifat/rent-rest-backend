import { Prisma } from "../../../prisma/generated/prisma/client";
import prisma from "../../lib/prisma";

const getPropertiesFromDb = async () => {
    const response = await prisma.property.findMany();
    return response
}

const getPropertyByIdFromDb = async (propertyId: string) => {
    const response = await prisma.property.findUniqueOrThrow({ where: { id: propertyId } });
    return response
}

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

const propertyServices = {
    getPropertiesFromDb,
    insertPropertyIntoDb,
    getPropertyByIdFromDb,
    deletePropertyByIdFromdb,
    updatePropertyByIdIntoDb
}

export default propertyServices;