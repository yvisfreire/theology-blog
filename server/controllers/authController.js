import { prisma } from '../database/index.js';
import jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const saltRounds = 10;

const login = async (req, res) => {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.send({ error: 'Usuário ou senha inválidos.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send({ error: 'Usuário ou senha inválidos.' });

    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '24h' });

    return res.json({ user, token })
}

const register = async (req, res) => {
    const { name, email, username, password } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
        data: {
            name,
            username,
            email,
            password: hash
        }
    })

    return res.json(user);
}

const changePassword = async (req, res) => {
    const { password } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.update({
        where: { id: req.user.id },
        data: {
            password: hash
        }
    });

    return res.json({ message: "Senha alterada com sucesso." })
}

export {
    login,
    register,
    changePassword
};