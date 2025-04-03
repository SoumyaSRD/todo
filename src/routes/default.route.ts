import { Request, Response, Router } from "express";

const DefaultRouter = Router();

DefaultRouter.get("/", (req: Request, res: Response) => {
    res.send("<h1>Default Page</h1>");
});

export default DefaultRouter; 
