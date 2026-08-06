import { PropertyStatus } from "../../../prisma/generated/prisma/enums";
import prisma from "../../lib/prisma";

const getPropertiesFromDb = async () => {
    const response = await prisma.property.findMany({
        where: { status: PropertyStatus.AVAILABLE },
        orderBy: { createdAt: "desc" },
    });
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