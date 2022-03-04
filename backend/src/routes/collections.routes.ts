
import Router from 'express';
import ensureAuthenticareUser from '../middleware/ensureAuthenticateUser';
import { CreateCollectionController } from '../modules/colletions/useCases/createCollection/CreateCollectionController';
import { DeleteCollectionController } from '../modules/colletions/useCases/deleteCollection/DeleteCollectionController';
import { EditCollectionController } from '../modules/colletions/useCases/editCollectionName/EditCollectionController';
import { ListCollectionController } from '../modules/colletions/useCases/listCollection/ListCollectionController';
import { ListCollectionDateController } from '../modules/colletions/useCases/listCollectionDate/ListCollectionDateController';


const collectionRoutes = Router();

const createCollectionController = new CreateCollectionController();
const listCollectionController = new ListCollectionController();
const editCollectionController = new EditCollectionController();
const deleteCollectionController = new DeleteCollectionController();
const listCollectionDateController = new ListCollectionDateController()

collectionRoutes.post('/collection', ensureAuthenticareUser, createCollectionController.handle)
collectionRoutes.get('/collection', ensureAuthenticareUser, listCollectionController.handle)

collectionRoutes.put('/collection/:id', ensureAuthenticareUser, editCollectionController.handle)
collectionRoutes.delete('/collection/:id', ensureAuthenticareUser, deleteCollectionController.handle)


collectionRoutes.get('/collection/listDate', ensureAuthenticareUser, listCollectionDateController.handle)




export { collectionRoutes };
