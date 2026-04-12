import express from 'express';
import {
  getSessions,
  getSessionById,
  completeSession,
  getUserProgress,
} from '../controllers/sessionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getSessions);
router.get('/:id', authenticate, getSessionById);
router.post('/:id/complete', authenticate, completeSession);
router.get('/:userId/progress', authenticate, getUserProgress);

export default router;
