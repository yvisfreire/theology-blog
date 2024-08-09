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

const getProfileImg = async (req, res) => {
    const { username } = req.params;

    try {
        const img = await prisma.profileImg.findUnique({ where: { username } });
        if (img) {
            res.set('Content-Type', `image/${img.type}`);
            return res.send(img.image)
        } else {
            return res.status(404).send({ error: "Imagem não encontrada." });
        }
    } catch (err) {
        console.error(err)
        return res.send({ error: "Erro ao recuperar a imagem." })
    }
}

function extractImageType(file) {
    const mimeType = file.mimetype;

    if (mimeType === 'image/png') return 'png';
    if (mimeType === 'image/jpeg') return 'jpeg';
    if (mimeType === 'image/jpg') return 'jpg';
    if (mimeType === 'image/gif') return 'gif';

    throw new Error('Tipo de imagem não suportado. Use png, jpg, jpeg ou gif.');
}

const profileUpload = async (req, res) => {
    const { username } = req.user;

    try {
        const profileImg = await prisma.profileImg.findUnique({ where: { username } })

        if (!profileImg) {
            const fileType = extractImageType(req.file);
            await prisma.profileImg.create({
                data: {
                    image: req.file.buffer,
                    type: fileType,
                    username
                }
            });
        } else {
            const fileType = extractImageType(req.file);
            await prisma.profileImg.update({
                where: { username },
                data: {
                    image: req.file.buffer,
                    type: fileType,
                }
            });
        }

        return res.json({ message: "Upload realizado com sucesso." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao salvar a imagem. " + err.message });
    }
}

export {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getProfileImg,
    profileUpload
}