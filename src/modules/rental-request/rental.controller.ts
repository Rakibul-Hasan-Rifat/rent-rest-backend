import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import rentalServices from "./rental.service";
import sendResponse from "../../utils/send-response";

const getRentals = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await rentalServices.retrieveRentalsFromDb()

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rentals retrieved successfully!",
        data: result
    })
})

const createRentals = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await rentalServices.insertRentalsIntoDb(req.body)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rentals retrieved successfully!",
        data: result
    })
})

const getRentalById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await rentalServices.insertRentalsIntoDb(req.body)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rentals retrieved successfully!",
        data: result
    })
})

const getRentalByLandlord = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await rentalServices.retrieveRentalByLandlord(req.user?.id as string)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rentals retrieved successfully!",
        data: result
    })
})

const updateRentalByLandlord = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await rentalServices.updateRentalStatusIntoDb(req.params.rentalId as string, req.body.status)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Rentals retrieved successfully!",
        data: result
    })
})

const rentalControllers = {
    getRentals,
    createRentals,
    getRentalById,
    getRentalByLandlord,
    updateRentalByLandlord
}

export default rentalControllers;