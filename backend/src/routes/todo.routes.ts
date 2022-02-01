import Router from 'express';
import ensureAuthenticareUser from '../middleware/ensureAuthenticateUser';
import { CreateTodoController } from '../modules/todo/useCases/createTodo/CreateTodoController';
import { DeleteTodoController } from '../modules/todo/useCases/deleteTodo/DeleteTodoController';
import { EditTodoController } from '../modules/todo/useCases/editTodo/EditTodoController';
import { ListTodoOfColletionController } from '../modules/todo/useCases/listTodoOfColletion/ListTodoOfColletionController';

const todoRoutes = Router()


const createTodoController = new CreateTodoController();
const editTodoController = new EditTodoController();
const listTodoOfColletionController = new ListTodoOfColletionController();
const deleteTodoController = new DeleteTodoController();


todoRoutes.post('/todo', ensureAuthenticareUser, createTodoController.handle);
todoRoutes.get('/todo/:colletionid', ensureAuthenticareUser, listTodoOfColletionController.handle);
todoRoutes.put('/todo', ensureAuthenticareUser, editTodoController.handle);
todoRoutes.delete('/todo/:id', ensureAuthenticareUser, deleteTodoController.handle);

export { todoRoutes }