import { Router } from "express";
import propertyControllers from "./property.controller";

const propertyRouter = Router();

propertyRouter.get("/", propertyControllers.getProperties)
propertyRouter.get("/:propertyId", propertyControllers.getPropertyById)

export default propertyRouter;