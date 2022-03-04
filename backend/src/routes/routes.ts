import { Router } from "express";
import { authRoutes } from "./authenticate.routes";
import { collectionRoutes } from "./collections.routes";
import { todoRoutes } from "./todo.routes";
import { usersRoutes } from "./users.routes";

const routes = Router()

routes.use(collectionRoutes);
routes.use(todoRoutes);
routes.use(usersRoutes);
routes.use(authRoutes);


export { routes }