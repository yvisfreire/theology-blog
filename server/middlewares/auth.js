import jsonwebtoken from 'jsonwebtoken';
import { prisma } from '../database/index.js';

import dotenv from 'dotenv';
dotenv.config();

const auth = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ error: "Erro de autorização. Nenhum token fornecido." })
    }

    try {
        const tokenData = jsonwebtoken.verify(token, process.env.JWT_PRIVATE_KEY);
        console.log(tokenData);
        const user = await prisma.user.findUnique({ where: { id: tokenData.id } });

        req.user = user;
        next()
    } catch (err) {
        return res.status(500).send({ error: "Erro de autorização. Falha na autenticação do token." })
    }
}

export default auth;
