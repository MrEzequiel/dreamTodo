import Router from 'express';
import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '../modules/accounts/useCases/refreshToken/RefreshTokenController';

const authRoutes = Router();

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authRoutes.post('/login', authenticateUserController.handle);
authRoutes.post('/refreshToken', refreshTokenController.handle);


export { authRoutes }