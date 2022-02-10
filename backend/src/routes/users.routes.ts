import { Router } from "express";
import ensureAuthenticareUser from "../middleware/ensureAuthenticateUser";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { AuthenticateUserGoogleController } from "../modules/accounts/useCases/authenticateUserGoogle/AuthenticateUserGoogleController";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { EditUserController } from "../modules/accounts/useCases/editUser/EditUserController";

const usersRoutes = Router()

const createUserController = new CreateUserController();
const editUserController = new EditUserController();
const authenticateUserController = new AuthenticateUserController()
const authenticateUserGoogleController = new AuthenticateUserGoogleController()

usersRoutes.put('/user', ensureAuthenticareUser, editUserController.handle);
usersRoutes.post('/user', createUserController.handle);

usersRoutes.post('/login', authenticateUserController.handle);
usersRoutes.post('/login/google/CLIENT_ID/token', authenticateUserGoogleController.handle);

export { usersRoutes }