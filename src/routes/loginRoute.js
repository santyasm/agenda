import { Router } from 'express';
const router = Router();
import loginController from '../controllers/loginController';

router.get('/index', loginController.index);

export default router;
