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

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/landlord", landlordRouter);
app.use("/api/v1/rentals", rentalRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/categories", categoryRouter);

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