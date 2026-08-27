import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { verifyToken } from "../utils/jwt";
import envVars from "../config/envVars";
import AppError from "../utils/app-error";
import prisma from "../lib/prisma";
import { UserRole } from "../../prisma/generated/prisma/enums";

const checkAuth = (...roles: UserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        // destructuring token from cookies or getting token from headers and throwing errors if not found
        const accessToken = req.cookies["access-token"] || req.headers.authorization?.split(" ")[1];

        if (!accessToken) throw new AppError(401, "Token missing - Access denied. 🤔")

        // token verification
        const decoded = verifyToken(accessToken, envVars.jwt_access_secret);
        if (typeof decoded === "string") throw new AppError(403, "Unauthorized - Invalid Access");

        // getting user from db and throwing error if not available in db
        const doesUserExist = await prisma.user.findFirstOrThrow({ where: { email: decoded.email } })

        // user status check
        if (doesUserExist.status === "BANNED" || doesUserExist.status === "INACTIVE") {
            throw new AppError(403, `Permission denied - User is ${doesUserExist.status.toLowerCase()}`)
        }

        // user's role check for the permission or denial
        if (roles.length && !roles.includes(doesUserExist.role)) {
            throw new AppError(403, "Access denied - You are not permissible.")
        }

        req.user = decoded;

        next()
    })
}

export default checkAuth;