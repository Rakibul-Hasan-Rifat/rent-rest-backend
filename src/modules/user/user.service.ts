import prisma from "../../lib/prisma"
import { UserPayload } from "./user.interface";

const getMeFromDb = async (payload: 
    UserPayload
) => {
    
    const {id, email, role} = payload

    const res = await prisma.user.findFirst({
        where: {
            id, email, role
        }
    })

    return res;
}

const userServices = { getMeFromDb }

export default userServices;