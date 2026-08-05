import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import categoryServices from "./category.service";
import sendResponse from "../../utils/send-response";

const getCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await categoryServices.getPropertyCategoryFromDb();

    sendResponse(res, {
        success: true, 
        statusCode: 200,
        message: "Categories are retrieved successfully!",
        data: result
    })
})

const categoryControllers = {
    getCategories
}

export default categoryControllers