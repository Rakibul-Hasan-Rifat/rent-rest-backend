import jwt, { SignOptions } from "jsonwebtoken";
import IUser from "../modules/user/user.interface";

export const createToken = (
    payload: Pick<IUser, "id" | "email" | "role">,
    jwtSecret: jwt.Secret,
    expiresIn: string
) => {
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn
    } as SignOptions);

    return token
}

export const verifyToken = (token: string, secrect: string) => {
    const verifiedToken = jwt.verify(token, secrect)

    return verifiedToken;
}