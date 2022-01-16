import { Router } from "express";
import { CreateColletionController } from "../modules/colletions/useCases/createColletion/CreateColletionController";
import { DeleteColletionController } from "../modules/colletions/useCases/deleteColletion/DeleteColletionController";
import { EditColletionController } from "../modules/colletions/useCases/editColletionName/EditColletionController";
import { ListColletionController } from "../modules/colletions/useCases/listColletion/ListColletionController";
import { CreateTodoController } from "../modules/todo/useCases/createTodo/CreateTodoController";
import { EditTodoController } from "../modules/todo/useCases/editTodo/EditTodoController";
import { ListTodoOfColletionController } from "../modules/todo/useCases/listTodoOfColletion/ListTodoOfColletionController";

const routes = Router()

const createTodoController = new CreateTodoController()
const editTodoController = new EditTodoController()
const createColletionController = new CreateColletionController()
const listColletionController = new ListColletionController()
const listTodoOfColletionController = new ListTodoOfColletionController()
const editColletionController = new EditColletionController()
const deleteColletionController = new DeleteColletionController()

routes.post('/todo', createTodoController.handle)
routes.put('/todo', editTodoController.handle)
routes.get('/todo/:colletionid', listTodoOfColletionController.handle)

routes.post('/colletion', createColletionController.handle)
routes.get('/colletion', listColletionController.handle)
routes.put('/colletion/:id', editColletionController.handle)
routes.delete('/colletion/:id', deleteColletionController.handle)



export { routes }