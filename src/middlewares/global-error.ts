import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '../../prisma/generated/prisma/internal/prismaNamespace';
import AppError from '../utils/app-error';
import envVars from '../config/envVars';

const globalError: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500,
        message = "Internal Server Error",
        errorDetails: unknown | null = "Something went wrong in the server.",
        stack = err.stack;

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorDetails = err.errorDetails
    } else if (err instanceof PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                statusCode = 409;
                message = "Resource already exists";
                break;
            case "P2003":
                statusCode = 400;
                message = "Invalid reference to related resource";
                break;
            case "P2011":
                statusCode = 400;
                message = "Missing required field"
                break;
            case "P2025":
                statusCode = 404;
                message = "Recource not found";
                break;
            default:
                statusCode = 500;
                message = "Database error";
                break;
        }
    } else if (err instanceof PrismaClientValidationError) {
        statusCode = 400;
        message = "Invalid request data";
    }

    if (statusCode === 500 && envVars.node_env === "production") {
        errorDetails = null;
    } else if (envVars.node_env !== "production" && err instanceof Error && errorDetails === null) {
        errorDetails = { stack: err.stack }
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorDetails,
        stack,
        data: null
    })
}

export default globalError;