import { Router } from "express";
import propertyControllers from "./property.controller";

const propertyRouter = Router();

propertyRouter.get("/", propertyControllers.getProperties)
propertyRouter.get("/:propertyId", propertyControllers.getPropertyById)
propertyRouter.post("/landlord", propertyControllers.createProperty)
propertyRouter.put("/landlord/:propertyId", propertyControllers.updateProperty)
propertyRouter.delete("/landlord/:propertyId", propertyControllers.deleteProperty)

export default propertyRouter;