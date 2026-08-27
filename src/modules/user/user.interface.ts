export type UserPayload = {
    id: string
    email: string
    role: "TENANT" | "LANDLORD" | "ADMIN"
}