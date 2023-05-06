import { Router } from 'express';
const router = Router();
import loginController from '../controllers/loginController';
import errorHandler from '../middlewares/errorHandler';

router.get('/index', errorHandler, loginController.index);

export default router;
