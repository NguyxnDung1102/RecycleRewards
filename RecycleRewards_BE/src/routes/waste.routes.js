import { Router } from 'express';
import { studentDashboard, listMine, submitWaste } from '../controllers/waste.controller.js';
import { allowRoles } from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/', allowRoles('student', 'admin'), listMine);
router.get('/dashboard/:studentId', allowRoles('student'), studentDashboard);
router.post('/', allowRoles('student'), submitWaste);
export default router;
