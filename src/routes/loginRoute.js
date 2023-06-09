import { Router } from 'express';
const router = Router();
import LoginController from '../controllers/LoginController';

router.get('/index', LoginController.index);
router.post('/register', LoginController.register);
router.post('/', LoginController.login);
router.get('/logout', LoginController.logout);

export default router;