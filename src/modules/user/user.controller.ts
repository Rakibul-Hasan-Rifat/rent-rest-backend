import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import userServices from "./user.service";
import sendResponse from "../../utils/send-response";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.insertUserIntoDb(req.body)

    sendResponse(res, {
        success: true, 
        statusCode: 201,
        message: "User is created successfully!",
        data: result
    })
});

const getUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.getUsersFromDb();

    sendResponse(res, {
        success: true, 
        statusCode: 200,
        message: "Users are retrieved successfully!",
        data: result
    })
})

const userControllers = {
    getUsers,
    createUser
}

export default userControllers;