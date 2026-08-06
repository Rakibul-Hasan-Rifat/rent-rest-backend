import { Router } from "express";
import adminControllers from "./admin.controller";

const adminRouter = Router();

adminRouter.get("/users", adminControllers.getAllUsers);
adminRouter.get("/properties", adminControllers.getAllProperties);
adminRouter.get("/rentals", adminControllers.getAllRentals);

export default adminRouter;