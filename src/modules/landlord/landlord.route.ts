import { Router } from "express";
import landlordControllers from "./landlord.controller";
import checkAuth from "../../middlewares/check-auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const landlordRouter = Router();

landlordRouter.post(
    "/properties",
    checkAuth(UserRole.LANDLORD),
    landlordControllers.createProperty);

landlordRouter.put(
    "/properties/:propertyId",
    checkAuth(UserRole.LANDLORD),
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
    landlordControllers.updateRentalByLandlord);

export default landlordRouter;