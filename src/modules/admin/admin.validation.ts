import z from "zod";
import { UserStatus } from "../../../prisma/generated/prisma/enums";

export const updateUserStatusSchema = z.object({
    status: z.enum(Object.values(UserStatus), `Invalid status. Valid values are: ${Object.values(UserStatus).join(", ")}`)
})