import { prisma } from '../database/index.js';

const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany();

    return res.json(users);
}

const getUser = async (req, res) => {
    const { username } = req.params;

    const user = await prisma.user.findUnique({ where: { username } })

    if (!post) return res.json({ error: "Usuário não encontrado." });

    return res.json(user);
}

const createUser = async (req, res) => {

}

const updateUser = async (req, res) => {

}

const deleteUser = async (req, res) => {

}

export {
    getUser
}