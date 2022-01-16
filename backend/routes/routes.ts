import { Router } from "express";
import { CreateColletionController } from "../modules/colletions/useCases/createColletion/CreateColletionController";
import { ListColletionController } from "../modules/colletions/useCases/listColletion/ListColletionController";
import { CreateTodoController } from "../modules/todo/useCases/createTodo/CreateTodoController";
import { EditTodoController } from "../modules/todo/useCases/editTodo/EditTodoController";

const routes = Router()

const createTodoController = new CreateTodoController()
const editTodoController = new EditTodoController()
const createColletionController = new CreateColletionController()
const listColletionController = new ListColletionController()

routes.post('/todo', createTodoController.handle)
routes.put('/todo', editTodoController.handle)


routes.post('/colletion', createColletionController.handle)
routes.get('/colletion/:id', listColletionController.handle)


export { routes }