import Router from 'express';
import ensureAuthenticareUser from '../middleware/ensureAuthenticateUser';
import { CreateTodoController } from '../modules/todo/useCases/createTodo/CreateTodoController';
import { DeleteTodoController } from '../modules/todo/useCases/deleteTodo/DeleteTodoController';
import { EditTodoController } from '../modules/todo/useCases/editTodo/EditTodoController';
import { ListTodoDateController } from '../modules/todo/useCases/listTodoDate/ListTodoDateController';
import { ListTodoOfColletionController } from '../modules/todo/useCases/listTodoOfColletion/ListTodoOfColletionController';
import { UpdadeCheckTodoController } from '../modules/todo/useCases/updadeCheckTodo/UpdadeCheckTodoController';

const todoRoutes = Router()

const createTodoController = new CreateTodoController();
const editTodoController = new EditTodoController();
const listTodoOfColletionController = new ListTodoOfColletionController();
const deleteTodoController = new DeleteTodoController();
const updateCheckTodoController = new UpdadeCheckTodoController();
const listTodoDateController = new ListTodoDateController()

todoRoutes.post('/todo/:id_collection', ensureAuthenticareUser, createTodoController.handle);
todoRoutes.put('/todo', ensureAuthenticareUser, editTodoController.handle);
todoRoutes.get('/todo/:name', ensureAuthenticareUser, listTodoOfColletionController.handle);
todoRoutes.delete('/todo/:id', ensureAuthenticareUser, deleteTodoController.handle);
todoRoutes.put('/todo/check/:id', ensureAuthenticareUser, updateCheckTodoController.handle);
todoRoutes.get('/todo/listDate/:id_collection', ensureAuthenticareUser, listTodoDateController.handle);

export { todoRoutes }