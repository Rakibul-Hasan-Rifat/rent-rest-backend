import { Router } from "express";
import landlordControllers from "./landlord.controller";

const landlordRouter = Router();

landlordRouter.post("/properties", landlordControllers.createProperty);
landlordRouter.put("/properties/:propertyId", landlordControllers.updateProperty);
landlordRouter.delete("/properties/:propertyId", landlordControllers.deleteProperty);

landlordRouter.get("/rentals", landlordControllers.getRentalByLandlord);
landlordRouter.patch("/rentals/:rentalId", landlordControllers.updateRentalByLandlord);

export default landlordRouter;