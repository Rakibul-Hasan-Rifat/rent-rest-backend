import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";
import envVars from "../../config/envVars";
import ICredentials from "./auth.interface";
import AppError from "../../utils/app-error";
import { createToken, verifyToken } from "../../utils/jwt";
import { Response } from "express";
import { Prisma } from "../../../prisma/generated/prisma/client";

const registerUser = async (payload: Prisma.UserCreateInput) => {

    const { password } = payload;
    const hashedPassword = await bcrypt.hash(password, Number(envVars.bcrypt_salt))

    const response = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword
        },
        omit: {
            password: true
        },
    })

    return response;
}

const loginService = async (payload: ICredentials) => {

    const user = await prisma.user.findUniqueOrThrow({ where: { email: payload.email } })

    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordMatched) {
        throw new AppError(401, "Credentials is not matched")
    }

    if (user.status === "BANNED" || user.status === "INACTIVE") {
        throw new AppError(403, `User is ${user.status}. So, the action is not permitted.`)
    }

    const { id, email, role } = user;

    const accessToken = createToken({ id, email, role }, envVars.jwt_access_secret, "3d");
    const refreshToken = createToken({ id, email, role }, envVars.jwt_refresh_secret, "30d");

    return { accessToken, refreshToken };
}

const logoutService = async (res: Response) => {
    res.clearCookie("access-token");
    res.clearCookie("refresh-token");
    return
}

const refreshTokenService = async (token: string, payload: ICredentials) => {

    if (!token) {
        throw new AppError(403, "No refresh token is found! 😒")
    }

    const verifiedToken = verifyToken(token, envVars.jwt_refresh_secret);
    if (typeof verifiedToken === "string") {
        throw new AppError(403, "Refresh-token verification is failed.")
    }

    const user = await prisma.user.findUniqueOrThrow({ where: { email: verifiedToken.email } })

    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordMatched) {
        throw new AppError(401, "Credentials is not matched")
    }

    if (user.status === "BANNED" || user.status === "INACTIVE") {
        throw new AppError(403, `User is ${user.status}. So, the action is not permitted.`)
    }

    const { id, email, role } = user;

    const accessToken = createToken({ id, email, role }, envVars.jwt_access_secret, "3d");

    return { accessToken }
}

const authServices = {
    registerUser,
    loginService,
    logoutService,
    refreshTokenService
}

export default authServices;