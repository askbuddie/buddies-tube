import { create, login } from '@controllers//users';
import { Router } from 'express';

const router = Router();

router.post('/', create);
router.post('/login', login);

export default router;
