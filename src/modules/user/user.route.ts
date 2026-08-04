import { Router } from "express";
import userControllers from "./user.controller";
import checkAuth from "../../middlewares/check-auth";

const userRouter = Router();

userRouter.get("/", userControllers.getUsers)
userRouter.post("/", checkAuth(), userControllers.createUser)

export default userRouter;