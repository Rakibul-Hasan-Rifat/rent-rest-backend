import express, { Application,  Request, Response } from "express";
import notFound from "./middlewares/not-found";
import globalError from "./middlewares/global-error";
import userRouter from "./modules/user/user.route";
import authRouter from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

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