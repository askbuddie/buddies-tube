import { create } from '@controllers/users';
import { Router } from 'express';

const router:Router = Router();

router.post('/', create);

export default router;
