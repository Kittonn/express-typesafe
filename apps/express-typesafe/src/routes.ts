import { Request, Response } from 'express';
import express from 'express';
import { userRoutes } from './modules/user';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello API' });
});

router.use('/users', userRoutes);

export default router;
