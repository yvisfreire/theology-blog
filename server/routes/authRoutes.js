import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import auth from '../middlewares/auth.js';

const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/register', auth, authController.register);
authRouter.put('/passChange', auth, authController.changePassword);
authRouter.get('/init', authController.initUser)

export { authRouter };