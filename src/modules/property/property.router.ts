import { Router } from "express";
import propertyControllers from "./property.controller";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import checkAuth from "../../middlewares/check-auth";

const propertyRouter = Router();

propertyRouter.get("/", propertyControllers.getProperties)
propertyRouter.get(
    "/:propertyId",
    checkAuth(UserRole.ADMIN, UserRole.LANDLORD, UserRole.TENANT), 
    propertyControllers.getPropertyById
)

export default propertyRouter;