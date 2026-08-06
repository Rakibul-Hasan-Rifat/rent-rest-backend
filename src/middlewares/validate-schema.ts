import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const validateSchema = (schema: ZodObject<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.body = schema.parse(req.body);
        next();
    };
}

export default validateSchema;