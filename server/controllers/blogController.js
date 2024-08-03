import { prisma } from '../database/index.js';
import slugify from 'slugify';

const getAllPosts = async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    return res.json(posts);
};

const getPost = async (req, res) => {
    const { slug } = req.params;

    const post = await prisma.post.findUnique({ where: { slug } });

    if (!post) return res.json({ error: "Post não encontrado." });

    return res.json(post);
}

const createPost = async (req, res) => {
    const { title, subtitle, imgUrl, content, published } = req.body;

    const wpm = 265;
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wpm);

    const post = await prisma.post.create({
        data: {
            title,
            subtitle,
            imgUrl,
            content,
            published,
            readingTime,
            slug: slugify(title, { lower: true })
        }
    });

    return res.json(post);
};

const updatePost = async (req, res) => {
    const { slug } = req.params;
    const { title, subtitle, imgUrl, content, published } = req.body;

    let post = await prisma.post.findUnique({ where: { slug } });

    if (!post) return res.json({ error: "Post não encontrado." });

    const wpm = 265;
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wpm);

    post = await prisma.post.update({
        where: { slug },
        data: {
            title,
            subtitle,
            imgUrl,
            content,
            published,
            readingTime,
            slug: slugify(title, { lower: true })
        }
    });

    return res.json(post);
}

const deletePost = async (req, res) => {
    const { slug } = req.params;

    const post = await prisma.post.findUnique({ where: { slug } });

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