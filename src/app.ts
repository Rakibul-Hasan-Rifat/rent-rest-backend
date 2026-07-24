import express, { Application,  Request, Response } from "express";

const app: Application = express();

app.use(express.json());

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

export default app;