
import Router from 'express';
import ensureAuthenticareUser from '../middleware/ensureAuthenticateUser';
import { CreateColletionController } from '../modules/colletions/useCases/createColletion/CreateColletionController';
import { DeleteColletionController } from '../modules/colletions/useCases/deleteColletion/DeleteColletionController';
import { EditColletionController } from '../modules/colletions/useCases/editColletionName/EditColletionController';
import { ListColletionController } from '../modules/colletions/useCases/listColletion/ListColletionController';
import { ListColletionByDateController } from '../modules/colletions/useCases/listColletionByDate/ListColletionByDateController';


const colletionRoutes = Router();

const createColletionController = new CreateColletionController();
const listColletionController = new ListColletionController();
const editColletionController = new EditColletionController();
const deleteColletionController = new DeleteColletionController();
const listColletionByDateController = new ListColletionByDateController();

colletionRoutes.post('/collection', ensureAuthenticareUser, createColletionController.handle)
colletionRoutes.get('/collection', ensureAuthenticareUser, listColletionController.handle)

colletionRoutes.put('/collection/:id', ensureAuthenticareUser, editColletionController.handle)
colletionRoutes.delete('/collection/:id', ensureAuthenticareUser, deleteColletionController.handle)

colletionRoutes.get('/collection/ByDate', ensureAuthenticareUser, listColletionByDateController.handle)



export { colletionRoutes };
