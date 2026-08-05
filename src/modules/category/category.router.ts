import { Router } from "express"
import categoryControllers from "./category.controller";

const categoryRouter = Router();

categoryRouter.get("/", categoryControllers.getCategories);

export default categoryRouter;