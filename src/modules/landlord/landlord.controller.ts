import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import landlordServices from "./landlord.service";

const createProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await landlordServices.insertPropertyIntoDb(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Property is created successfully",
        data: result,
        error: null
    })
})

const getPropertiesByLandlord = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await landlordServices.getPropertiesFromDb(req.user?.id);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Properties are retrieved successfully!",
        data: result,
        error: null
    })
})

const updateProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await landlordServices.updatePropertyByIdIntoDb(req.params.propertyId as string, req.body)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Property is updated successfully",
        data: result,
        error: null
    })
});

const deleteProperty = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await landlordServices.deletePropertyByIdFromdb(req.user?.id, req.params.propertyId as string)
    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Property is deleted successfully",
        data: result,
        error: null
    })
});

const getRentalByLandlord = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await landlordServices.retrieveRentalByLandlord(req.user?.id as string)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rentals retrieved successfully!",
        data: result
    })
})

const updateRentalByLandlord = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await landlordServices.updateRentalStatusIntoDb(req.params.rentalId as string, req.body.status)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rentals retrieved successfully!",
        data: result
    })
})

const landlordControllers = {
    createProperty,
    updateProperty,
    deleteProperty, 
    getPropertiesByLandlord,
    getRentalByLandlord,
    updateRentalByLandlord
}

export default landlordControllers;