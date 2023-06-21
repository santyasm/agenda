import { Router } from 'express';
const router = Router();
import ContactController from '../controllers/ContactController';

router.get('/', ContactController.index);

export default router;