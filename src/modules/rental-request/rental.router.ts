import { Router } from "express";
import rentalControllers from "./rental.controller";

const rentalRouter = Router();

rentalRouter.get("/", rentalControllers.getRentals);
rentalRouter.post("/", rentalControllers.createRentals);
rentalRouter.get("/:rentalId", rentalControllers.getRentalById);
rentalRouter.get("/landlord", rentalControllers.getRentalByLandlord)
rentalRouter.patch("/landlord/:rentalId", rentalControllers.updateRentalByLandlord)

export default rentalRouter;