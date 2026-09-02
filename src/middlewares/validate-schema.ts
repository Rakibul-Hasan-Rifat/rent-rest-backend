import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const validateSchema = (schema: ZodObject<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log("Schema validation middleware is called 1");

        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (err) {
            next(err);
        }
    };
}

export default validateSchema;