import { Router } from "express";
import adminControllers from "./admin.controller";
import checkAuth from "../../middlewares/check-auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import validateSchema from "../../middlewares/validate-schema";
import { updateUserStatusSchema } from "./admin.validation";

const adminRouter = Router();

adminRouter.get(
    "/users",
    checkAuth(UserRole.ADMIN),
    adminControllers.getAllUsers
);

adminRouter.patch(
    "/users/:userId", 
    checkAuth(UserRole.ADMIN),
    validateSchema(updateUserStatusSchema),
    adminControllers.updateUserStatus
);

adminRouter.get(
    "/properties", 
    checkAuth(UserRole.ADMIN),
    adminControllers.getAllProperties
);
    
adminRouter.get(
    "/rentals", 
    checkAuth(UserRole.ADMIN),
    adminControllers.getAllRentals
);

export default adminRouter;