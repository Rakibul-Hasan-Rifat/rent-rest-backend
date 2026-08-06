import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import adminServices from "./admin.service";
import sendResponse from "../../utils/send-response";

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.retrieveAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Users retrieved successfully",
        data: result,
    })
})
const getAllProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.retrieveAllProperties();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Properties retrieved successfully",
        data: result,
    })
})
const getAllRentals = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await adminServices.retrieveAllRentals();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rentals retrieved successfully",
        data: result,
    })
})

const adminControllers = {getAllUsers, getAllProperties, getAllRentals};

export default adminControllers;