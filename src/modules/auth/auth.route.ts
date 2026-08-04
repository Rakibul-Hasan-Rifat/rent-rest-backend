import { Router } from "express";
import authControllers from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", authControllers.login);
authRouter.post("/refresh-token", authControllers.refreshToken);


export default authRouter;