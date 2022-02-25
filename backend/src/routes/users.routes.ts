import { Router } from "express";
import multer from 'multer';
import multerConfig from '../config/multer'
import ensureAuthenticareUser from "../middleware/ensureAuthenticateUser";
import newPasswordUser from "../middleware/newPasswordUser";
import { CompareCodeController } from "../modules/accounts/useCases/compareCode/CompareCodeController";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { EditUserController } from "../modules/accounts/useCases/editUser/EditUserController";
import { NewPasswordUserController } from "../modules/accounts/useCases/alterPasswordUser/NewPasswordUserController";
import { SendMailForgotPasswordController } from "../modules/accounts/useCases/sendMailForgotPassword/SendMailForgotPasswordController";

const usersRoutes = Router()

const createUserController = new CreateUserController();
const editUserController = new EditUserController();

const sendMailForgotPasswordController = new SendMailForgotPasswordController();
const compareCodeController = new CompareCodeController();
const newPasswordUserController = new NewPasswordUserController();

const uploadAvatar = multer(multerConfig);


usersRoutes.put('/user', ensureAuthenticareUser, editUserController.handle);
usersRoutes.post('/user', uploadAvatar.single('imageURL'), createUserController.handle);

usersRoutes.post('/forgotPassword', sendMailForgotPasswordController.handle);
usersRoutes.post('/compareCode', compareCodeController.handle);
usersRoutes.post('/newPassword', newPasswordUser, newPasswordUserController.handle)


export { usersRoutes }