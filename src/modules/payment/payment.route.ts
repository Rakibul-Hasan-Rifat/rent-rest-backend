import { Router } from "express";
import checkAuth from "../../middlewares/check-auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { checkout, webhook } from "./payment.controller";

const paymentRouter = Router();

paymentRouter.post("/checkout/:rentalId", checkAuth(UserRole.TENANT), checkout)

paymentRouter.post("/webhook", webhook)

export default paymentRouter;