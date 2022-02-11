import { Router } from "express";
import { authRoutes } from "./authenticate.routes";
import { colletionRoutes } from "./colletions.routes";
import { todoRoutes } from "./todo.routes";
import { usersRoutes } from "./users.routes";

const routes = Router()

routes.use(colletionRoutes);
routes.use(todoRoutes);
routes.use(usersRoutes);
routes.use(authRoutes);


export { routes }