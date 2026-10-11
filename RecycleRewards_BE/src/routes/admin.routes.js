import { Router } from 'express';
import { listSubmissions, reviewSubmission } from '../controllers/admin.controller.js';
import { allowRoles } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(allowRoles('admin'));
router.get('/submissions', listSubmissions);
router.patch('/submissions/:id', reviewSubmission);
export default router;
