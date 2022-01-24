import { Router } from "express";
import ensureAuthenticareUser from "../middleware/ensureAuthenticateUser";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { EditUserController } from "../modules/accounts/useCases/editUser/EditUserController";

const usersRoutes = Router()

const createUserController = new CreateUserController();
const editUserController = new EditUserController();
const authenticateUserControlleer = new AuthenticateUserController()

usersRoutes.put('/user', ensureAuthenticareUser, editUserController.handle);
usersRoutes.post('/user', createUserController.handle);
usersRoutes.post('/login', authenticateUserControlleer.handle);

export { usersRoutes }