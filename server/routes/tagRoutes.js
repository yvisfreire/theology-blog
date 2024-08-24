import { Router } from 'express';
import * as tagController from '../controllers/tagController.js';
import auth from '../middlewares/auth.js';

const tagRouter = Router();

tagRouter.get('/tags', tagController.getAllTags);
tagRouter.get('/tags/:slug', tagController.getTag);
tagRouter.post('/tags', tagController.createTag);
tagRouter.put('/tags/:slug', tagController.updateTag);
tagRouter.delete('/tags/:slug', tagController.deleteTag);

export { tagRouter };