import { Router } from 'express';
const router = Router();
import LoginController from '../controllers/LoginController';
import errorHandler from '../middlewares/errorHandler';

router.get('/index', errorHandler, LoginController.index);
router.post('/register', errorHandler, LoginController.store);

export default router;