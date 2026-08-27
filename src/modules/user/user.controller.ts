import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { UserPayload } from "./user.interface";
import userServices from "./user.service";
import { NextFunction, Request, Response } from "express";

const getMe = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    console.log("user controller")
    const result = await userServices.getMeFromDb(req.user as UserPayload)



    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "My data is retrieved successfully!",
        data: result,
        error: null
    })
});

const userControllers = {getMe}

export default userControllers

