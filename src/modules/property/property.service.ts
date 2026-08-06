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


const propertyServices = {
    getPropertiesFromDb,
    getPropertyByIdFromDb,
}

export default propertyServices;