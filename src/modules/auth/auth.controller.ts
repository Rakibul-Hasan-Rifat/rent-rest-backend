import { NextFunction, Request, Response } from "express";
import authServices from "./auth.service";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import envVars from "../../config/envVars";

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.loginService(req.body)

    res.cookie("access-token", result.accessToken, {
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
        sameSite: "lax",
        secure: envVars.node_env === "production",
    })

    res.cookie("refresh-token", result.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "lax",
        secure: envVars.node_env === "production"
    })

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User is created successfully!",
        data: result
    })
});

const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies);
    
    const result = await authServices.refreshTokenService(req.cookies["refresh-token"], req.body);

    res.cookie("access-token", result.accessToken)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Refresh token is generated successfully!",
        data: result,
    })
})

const authControllers = {
    login,
    refreshToken
}

export default authControllers;