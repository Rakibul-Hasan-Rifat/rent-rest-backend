import { Router } from "express";
import userControllers from "./user.controller";
import checkAuth from "../../middlewares/check-auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const userRouter = Router();

userRouter.get(
    "/me",
    checkAuth(UserRole.ADMIN, UserRole.LANDLORD, UserRole.TENANT),
    userControllers.getMe
)

export default userRouter;