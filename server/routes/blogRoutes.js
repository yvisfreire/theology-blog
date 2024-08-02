import { Router } from 'express';
import * as blogController from '../controllers/blogController.js';

const blogRouter = Router();

blogRouter.get('/blog', blogController.getAllPosts);
blogRouter.get('/blog/:slug', blogController.getPost);
blogRouter.post('/blog', blogController.createPost);
blogRouter.put('/blog/:slug', blogController.updatePost);
blogRouter.delete('/blog/:slug', blogController.deletePost);

export { blogRouter };