import { Router } from "express";
import rentalControllers from "./rental.controller";
import checkAuth from "../../middlewares/check-auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const rentalRouter = Router();

rentalRouter.get(
    "/", 
    checkAuth(UserRole.ADMIN, UserRole.LANDLORD), 
    rentalControllers.getRentals
);
rentalRouter.post(
    "/", 
    checkAuth(UserRole.TENANT), 
    rentalControllers.createRentals
);
rentalRouter.get(
    "/:rentalId", 
    checkAuth(UserRole.ADMIN, UserRole.LANDLORD, UserRole.TENANT),
    rentalControllers.getRentalById
);

export default rentalRouter;