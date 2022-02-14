
import Router from 'express';
import ensureAuthenticareUser from '../middleware/ensureAuthenticateUser';
import { CreateColletionController } from '../modules/colletions/useCases/createColletion/CreateColletionController';
import { DeleteColletionController } from '../modules/colletions/useCases/deleteColletion/DeleteColletionController';
import { EditColletionController } from '../modules/colletions/useCases/editColletionName/EditColletionController';
import { ListColletionController } from '../modules/colletions/useCases/listColletion/ListColletionController';


const colletionRoutes = Router();

const createColletionController = new CreateColletionController();
const listColletionController = new ListColletionController();
const editColletionController = new EditColletionController();
const deleteColletionController = new DeleteColletionController();

colletionRoutes.post('/colletion', ensureAuthenticareUser, createColletionController.handle)
colletionRoutes.get('/colletion', ensureAuthenticareUser, listColletionController.handle)
colletionRoutes.put('/colletion/:id', ensureAuthenticareUser, editColletionController.handle)
colletionRoutes.delete('/colletion/:id', ensureAuthenticareUser, deleteColletionController.handle)



export { colletionRoutes };
