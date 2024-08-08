import { prisma } from '../database/index.js';

const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany();

    return res.json(users);
}

const getUser = async (req, res) => {
    const { username } = req.params;

    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) return res.json({ error: "Usuário não encontrado." });

    return res.json(user);
}

const updateUser = async (req, res) => {
    const { name, email, username } = req.body;

    let user = await prisma.user.findUnique({ where: { username: req.params.username } });

    if (!user) return res.json({ error: "Usuário não encontrado." });

    user = await prisma.user.update({
        where: { username: req.params.username },
        data: {
            name,
            username,
            email
        }
    });

    return res.json(user);
}

const deleteUser = async (req, res) => {
    const { username } = req.params;

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.json({ error: "Usuário não encontrado." });

    await prisma.user.delete({ where: { slug } });

    return res.json({ message: "Usuário deletado." });
}

const profileUpload = async (req, res) => {
    const user = await prisma.user.update({
        where: { id: req.user.id },
        data: { profileImg: req.filename }
    });

    if (!user) return res.json({ error: "Usuário nao encontrado." });

    res.json({ message: "Upload realizado com sucesso." });
}

export {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    profileUpload
}