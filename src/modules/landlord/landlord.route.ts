import { Router } from "express";
import landlordControllers from "./landlord.controller";
import checkAuth from "../../middlewares/check-auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import validateSchema from "../../middlewares/validate-schema";
import { createPropertySchema, updatePropertySchema, updateRentalStatusSchema } from "./landlord.validation";

const landlordRouter = Router();

landlordRouter.post(
    "/properties",
    checkAuth(UserRole.LANDLORD),
    validateSchema(createPropertySchema),
    landlordControllers.createProperty);

landlordRouter.put(
    "/properties/:propertyId",
    checkAuth(UserRole.LANDLORD),
    validateSchema(updatePropertySchema),
    landlordControllers.updateProperty);

landlordRouter.delete(
    "/properties/:propertyId",
    checkAuth(UserRole.LANDLORD),
    landlordControllers.deleteProperty);

landlordRouter.get(
    "/rentals",
    checkAuth(UserRole.LANDLORD),
    landlordControllers.getRentalByLandlord);
    
landlordRouter.patch(
    "/rentals/:rentalId",
    checkAuth(UserRole.LANDLORD),
    validateSchema(updateRentalStatusSchema),
    landlordControllers.updateRentalByLandlord);

export default landlordRouter;