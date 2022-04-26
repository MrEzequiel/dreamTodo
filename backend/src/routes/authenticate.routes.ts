import Router from 'express';
import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { AuthenticateUserGoogleController } from '../modules/accounts/useCases/authenticateUserGoogle/AuthenticateUserGoogleController';
import { RefreshTokenController } from '../modules/accounts/useCases/refreshToken/RefreshTokenController';

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()
const authenticateUserGoogleController = new AuthenticateUserGoogleController()

authRoutes.post('/login', authenticateUserController.handle);
authRoutes.post('/refreshToken', refreshTokenController.handle);
authRoutes.post('/login/google/:CLIENT_ID/:token', authenticateUserGoogleController.handle);


export { authRoutes }