import { prisma } from '../database/index.js';
import slugify from 'slugify';

const getAllTags = async (req, res) => {
    const tags = await prisma.tag.findMany({
        include: {
            _count: {
                select: { posts: true }
            }
        }
    })

    return res.status(200).json(tags);
};

const getTag = async (req, res) => {
    const { slug } = req.params;
    const tag = await prisma.tag.findUnique({
        where: { slug },
        include: {
            posts: {
                select: {
                    id: true,
                    title: true,
                    subtitle: true,
                    slug: true,
                    published: true,
                    imgUrl: true,
                    readingTime: true,
                    createdAt: true,
                    author: {
                        select: {
                            name: true,
                            username: true
                        }
                    },
                    tags: true
                }
            },
            _count: {
                select: { posts: true }
            }
        }
    });

    return res.status(200).json(tag);
};

const createTag = async (req, res) => {
    const { name } = req.body;
    const tag = await prisma.tag.create({
        data: {
            name,
            slug: slugify(name, { lower: true })
        }
    });

    return res.status(200).json({ message: "Tag criada com sucesso." });
};

const updateTag = async (req, res) => {
    const { slug } = req.params;
    const { name } = req.body;

    const tag = await prisma.tag.update({
        where: { slug },
        data: {
            name,
            slug: slugify(name, { lower: true })
        }
    });

    return res.status(200).json({ message: "Tag atualizada com sucesso." });
};

const deleteTag = async (req, res) => {
    const { slug } = req.params;
    const tag = await prisma.tag.delete({
        where: { slug }
    });

    return res.status(200).json({ message: "Tag deletada com sucesso." });
};

export {
    getTag,
    getAllTags,
    createTag,
    updateTag,
    deleteTag
}