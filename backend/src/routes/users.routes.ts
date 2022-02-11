import { Router } from "express";
import ensureAuthenticareUser from "../middleware/ensureAuthenticateUser";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { EditUserController } from "../modules/accounts/useCases/editUser/EditUserController";
import { SendMailForgotPasswordController } from "../modules/accounts/useCases/sendMailForgotPassword/SendMailForgotPasswordController";

const usersRoutes = Router()

const createUserController = new CreateUserController();
const editUserController = new EditUserController();

const sendMailForgotPasswordController = new SendMailForgotPasswordController();


usersRoutes.put('/user', ensureAuthenticareUser, editUserController.handle);
usersRoutes.post('/user', createUserController.handle);

usersRoutes.post('/forgotPassword', sendMailForgotPasswordController.handle);


export { usersRoutes }