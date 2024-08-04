import { prisma } from '../database/index.js';
import jsonwebtoken from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || password !== user.password)
        return res.send({ error: 'Usuário ou senha inválidos.' });

    const token = jsonwebtoken.sign({ user }, process.env.JWT_PRIVATE_KEY, { expiresIn: '24h' });

    return res.json({ user, token })
}

export {
    login,
};