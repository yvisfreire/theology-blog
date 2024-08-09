import { Router } from "express";
import multer from 'multer';
import auth from '../middlewares/auth.js';
import { fileURLToPath } from 'url';
import path from 'path';
import * as userController from '../controllers/userController.js'

const userRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();

const upload = multer({ storage });

userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:username', userController.getUser);
userRouter.put('/users/:username', auth, userController.updateUser);
userRouter.delete('/users/:username', auth, userController.deleteUser);
userRouter.get('/users/:username/profileImg', userController.getProfileImg);
userRouter.post('/users/profile', auth, upload.single('profile'), userController.profileUpload);

export { userRouter };