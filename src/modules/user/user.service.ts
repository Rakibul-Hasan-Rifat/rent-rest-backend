import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";
import IUser from "./user.interface";
import envVars from "../../config/envVars";


const insertUserIntoDb = async (payload: IUser) => {

    const { password } = payload;
    const hashedPassword = await bcrypt.hash(password, Number(envVars.bcrypt_salt))

    const response = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword
        }
    })

    return response;
}

const getUsersFromDb = async () => {
    const response = await prisma.user.findMany();
    return response
}

const userServices = {
    getUsersFromDb,
    insertUserIntoDb
}

export default userServices;