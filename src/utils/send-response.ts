import { Response } from "express";

const sendResponse = <T>(res: Response, { success, statusCode, message, data, error = null }: { success: boolean, statusCode: number, message: string, data?: T, error?: unknown }) => {
    res.status(statusCode).send({
        success,
        message,
        data,
        meta: {},
        error
    })
};

export default sendResponse