import { Request, Response, Router } from "express";
import TodoRoutes from "./module/todo/routes/todo.routes";

const DefaultRouter: Router = Router();

DefaultRouter.use('/todo', TodoRoutes);

DefaultRouter.use("/", (req: Request, res: Response) => {
    res.send("<h1>Default Page</h1>");
});

export default DefaultRouter; 
