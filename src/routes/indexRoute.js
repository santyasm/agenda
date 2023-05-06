import { Router } from 'express';
const router = Router();
import IndexController from '../controllers/IndexController';

router.get('/', IndexController.index);

export default router;