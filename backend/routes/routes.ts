
import { Router } from "express";
import { CreateTodoController } from "../modules/todo/createTodo/useCase/CreateTodoController";

const routes = Router()

const createTodoController = new CreateTodoController();

routes.post('/todo', createTodoController.handle);

export { routes }