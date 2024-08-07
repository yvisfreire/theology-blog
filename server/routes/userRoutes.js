import { Router } from "express";
import multer from 'multer';
import auth from '../middlewares/auth.js';
import { fileURLToPath } from 'url';
import path from 'path';
import * as userController from '../controllers/userController.js'

const userRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        req.filename = req.user.username + path.extname(file.originalname)
        cb(null, req.filename);
    }
});

const upload = multer({ storage });

userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:username', userController.getUser);
userRouter.put('/users/:username', auth, userController.updateUser);
userRouter.delete('/users/:username', auth, userController.deleteUser);
userRouter.post('/users/profile', auth, upload.single('profile'), userController.profileUpload);

export { userRouter };