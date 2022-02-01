import { Router } from "express";
import { colletionRoutes } from "./colletions.routes";
import { todoRoutes } from "./todo.routes";
import { usersRoutes } from "./users.routes";

const routes = Router()

routes.use(colletionRoutes);
routes.use(todoRoutes);
routes.use(usersRoutes)


export { routes }