import { Response } from "express";

const sendResponse = <T>(res: Response, { statusCode, message, data }: { statusCode: number, message: string, data: T }) => {
    res.status(statusCode).send({
        success: true,
        message,
        data,
        meta: {},
        error: null
    })
};

export default sendResponse