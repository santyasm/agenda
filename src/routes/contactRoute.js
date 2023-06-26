import { Router } from 'express';
const router = Router();
import ContactController from '../controllers/ContactController';

router.get('/index', ContactController.index);
router.post('/', ContactController.store);

export default router;