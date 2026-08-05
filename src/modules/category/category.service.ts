import prisma from "../../lib/prisma";

const getPropertyCategoryFromDb = async () => {
    const response = await prisma.category.findMany();
    return response;
}

const categoryServices = {
    getPropertyCategoryFromDb
}

export default categoryServices;