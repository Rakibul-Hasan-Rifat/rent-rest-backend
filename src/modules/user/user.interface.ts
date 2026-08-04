import { UserRole, UserStatus } from "../../../prisma/generated/prisma/enums"

export default interface IUser {
    id?: string
    name: string
    email: string
    password: string
    phone?: string
    portfolio?: string
    role?: typeof UserRole[keyof typeof UserRole]
    status?: typeof UserStatus[keyof typeof UserStatus]
    createdAt?: Date
    updatedAt?: Date
}