import { Router } from "express";
import userControllers from "./user.controller";

const userRouter = Router();

userRouter.get("/", userControllers.getUsers)
userRouter.post("/", userControllers.createUser)

export default userRouter;