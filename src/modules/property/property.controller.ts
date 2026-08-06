import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import propertyServices from "./property.service";

const getProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await propertyServices.getPropertiesFromDb()

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User is created successfully!",
        data: result
    })
});

const getPropertyById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await propertyServices.getPropertyByIdFromDb(req.params.propertyId as string);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Properties are retrieved successfully!",
        data: result
    })
})


const propertyControllers = {
    getProperties,
    getPropertyById,
}

export default propertyControllers;