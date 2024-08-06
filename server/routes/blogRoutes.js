import { Router } from 'express';
import * as blogController from '../controllers/blogController.js';
import auth from '../middlewares/auth.js';

const blogRouter = Router();

blogRouter.get('/blog', blogController.getAllPosts);
blogRouter.get('/blog/:slug', blogController.getPost);
blogRouter.post('/blog', auth, blogController.createPost);
blogRouter.put('/blog/:slug', auth, blogController.updatePost);
blogRouter.delete('/blog/:slug', auth, blogController.deletePost);

export { blogRouter };