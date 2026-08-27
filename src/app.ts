import cors from "cors";
import express, { Application,  Request, Response } from "express";
import notFound from "./middlewares/not-found";
import globalError from "./middlewares/global-error";
import authRouter from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import propertyRouter from "./modules/property/property.router";
import categoryRouter from "./modules/category/category.router";
import rentalRouter from "./modules/rental-request/rental.router";
import adminRouter from "./modules/admin/admin.route";
import landlordRouter from "./modules/landlord/landlord.route";
import paymentRouter from "./modules/payment/payment.route";
import { webhook } from "./modules/payment/payment.controller";
import userRouter from "./modules/user/user.router";

const app: Application = express();

app.use("/api/v1/payment/webhook", express.raw({ type: "application/json"}), webhook);
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "http://192.168.0.113:3000", "https://rent-rest-frontend.vercel.app"],
    credentials: true
}))
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/landlord", landlordRouter);
app.use("/api/v1/rentals", rentalRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/payment", paymentRouter);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        owner: "Rakibul Hasan",
        email: "rakibulhasan745101@gmail.com",
        url: req.url,
        method: req.method,
        baseUrl: req.baseUrl,
        path: req.path
    })
})

app.use(globalError)
app.use(notFound)

export default app;