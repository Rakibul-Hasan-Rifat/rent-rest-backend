import { UserStatus } from "../../../prisma/generated/prisma/enums";
import prisma from "../../lib/prisma";

const retrieveAllUsers = async () => {
    const response = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        omit: { password: true }
    });
    return response;
};

const retrieveAllProperties = async () => {
    const response = await prisma.property.findMany({
        orderBy: { createdAt: "desc" }
    });
    return response;
};

const retrieveAllRentals = async () => {
    const response = await prisma.rentalRequest.findMany({
        orderBy: { createdAt: "desc" }
    });
    return response;
};

const updateUserStatus = async (userId: string, status: UserStatus) => {
    const response = await prisma.user.update({
        where: { id: userId },
        data: { status },
        omit: { password: true }
    });
    return response;
};

const adminServices = { retrieveAllUsers, retrieveAllProperties, retrieveAllRentals, updateUserStatus };

export default adminServices;