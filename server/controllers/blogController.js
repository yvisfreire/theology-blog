import { prisma } from '../database/index.js';
import slugify from 'slugify';

const getAllPosts = async (req, res) => {
    let posts = await prisma.post.findMany();

    return res.json(posts);
};

const getPost = async (req, res) => {
    const { slug } = req.params;

    let post = await prisma.post.findUnique({ where: { slug } });

    if (!post) return res.json({ error: "Post não encontrado." });

    return res.json(post);
}

const createPost = async (req, res) => {
    const { title, content } = req.body;

    let post = await prisma.post.create({
        data: {
            title,
            content,
            slug: slugify(title, { lower: true })
        }
    });

    return res.json(post);
};

const updatePost = async (req, res) => {
    const { slug } = req.params;
    let { title, content, published } = req.body;

    let post = await prisma.post.findUnique({ where: { slug } });

    published = undefined;

    if (!post) return res.json({ error: "Post não encontrado." });

    post = await prisma.post.update({
        where: { slug },
        data: {
            title,
            content,
            published
        }
    });

    return res.json(post);
}

const deletePost = async (req, res) => {
    const { slug } = req.params;

    let post = await prisma.post.findUnique({ where: { slug } });

    if (!post) return res.json({ error: "Post não encontrado." });

    await prisma.post.delete({ where: { slug } });

    return res.json({ message: "Post deletado." });
}

export {
    getPost,
    getAllPosts,
    createPost,
    updatePost,
    deletePost
};