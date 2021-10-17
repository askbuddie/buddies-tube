import { create } from '@controllers/users';
import { Router } from 'express';

const router = Router();

router.post('/', create);

export default router;
