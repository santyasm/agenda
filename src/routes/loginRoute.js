import { Router } from 'express';
const router = Router();
import LoginController from '../controllers/LoginController';

router.get('/index', LoginController.index);
router.post('/register', LoginController.store);
router.post('/', LoginController.login);

export default router;