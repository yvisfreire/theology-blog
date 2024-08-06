import { Router } from "express";
import multer from 'multer';
import auth from '../middlewares/auth.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { prisma } from "../database/index.js";

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

userRouter.post('/user/profile', auth, upload.single('profile'), async (req, res) => {
    const user = await prisma.user.update({
        where: { id: req.user.id },
        data: { profileImg: req.filename }
    });

    if (!user) return res.json({ error: "Usuário nao encontrado." });

    res.json({ message: "Upload realizado com sucesso." });
});

export { userRouter };