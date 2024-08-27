import { Router } from 'express';
import * as tagController from '../controllers/tagController.js';
import auth from '../middlewares/auth.js';

const tagRouter = Router();

tagRouter.get('/tags', tagController.getAllTags);
tagRouter.get('/tags/:slug', tagController.getTag);
tagRouter.post('/tags', auth, tagController.createTag);
tagRouter.put('/tags/:slug', auth, tagController.updateTag);
tagRouter.delete('/tags/:slug', auth, tagController.deleteTag);

export { tagRouter };