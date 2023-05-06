import { Router } from 'express';
const router = Router();
import loginController from '../controllers/loginController';
import errorHandler from '../middlewares/errorHandler';

router.get('/index', errorHandler, loginController.index);
router.post('/register', errorHandler, loginController.store);

export default router;
