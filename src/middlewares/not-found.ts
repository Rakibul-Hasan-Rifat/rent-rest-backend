import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status"

const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: `Not found ${req.originalUrl} 😒`
    })
}

export default notFound;