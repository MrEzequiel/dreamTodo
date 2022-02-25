import Router from 'express';
import ensureAuthenticareUser from '../middleware/ensureAuthenticateUser';
import { CreateTodoController } from '../modules/todo/useCases/createTodo/CreateTodoController';
import { DeleteTodoController } from '../modules/todo/useCases/deleteTodo/DeleteTodoController';
import { EditTodoController } from '../modules/todo/useCases/editTodo/EditTodoController';
import { ListTodoByDateController } from '../modules/todo/useCases/listTodoByDate/ListTodoByDateController';
import { ListTodoOfColletionController } from '../modules/todo/useCases/listTodoOfColletion/ListTodoOfColletionController';
import { UpdadeCheckTodoController } from '../modules/todo/useCases/updadeCheckTodo/UpdadeCheckTodoController';

const todoRoutes = Router()

const createTodoController = new CreateTodoController();
const editTodoController = new EditTodoController();
const listTodoOfColletionController = new ListTodoOfColletionController();
const deleteTodoController = new DeleteTodoController();
const updateCheckTodoController = new UpdadeCheckTodoController();
const listTodoByDateController = new ListTodoByDateController()

todoRoutes.post('/todo', ensureAuthenticareUser, createTodoController.handle);
todoRoutes.get('/todo/:colletionid', ensureAuthenticareUser, listTodoOfColletionController.handle);
todoRoutes.put('/todo', ensureAuthenticareUser, editTodoController.handle);
todoRoutes.delete('/todo/:id', ensureAuthenticareUser, deleteTodoController.handle);
todoRoutes.put('/todo/:id', ensureAuthenticareUser, updateCheckTodoController.handle);
todoRoutes.get('/todo/listDate/:id_todo', ensureAuthenticareUser, listTodoByDateController.handle);

export { todoRoutes }