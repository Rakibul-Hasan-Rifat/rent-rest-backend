import { Router } from "express";
import adminControllers from "./admin.controller";
import checkAuth from "../../middlewares/check-auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const adminRouter = Router();

adminRouter.get(
    "/users",
    checkAuth(UserRole.ADMIN),
    adminControllers.getAllUsers);

adminRouter.get(
    "/properties", 
    checkAuth(UserRole.ADMIN),
    adminControllers.getAllProperties);
    
adminRouter.get(
    "/rentals", 
    checkAuth(UserRole.ADMIN),
    adminControllers.getAllRentals);

export default adminRouter;