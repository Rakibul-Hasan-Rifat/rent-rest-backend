import { Router } from "express";
import rentalControllers from "./rental.controller";

const rentalRouter = Router();

rentalRouter.get("/", rentalControllers.getRentals);
rentalRouter.post("/", rentalControllers.createRentals);
rentalRouter.get("/:rentalId", rentalControllers.getRentalById);

export default rentalRouter;