import express from 'express';
import {
  getSessions,
  getSessionById,
  markSessionComplete,
  getUserProgress,
} from '../controllers/sessionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSessions);
router.get('/:id', getSessionById);
router.post('/:id/complete', authenticate, markSessionComplete);
router.get('/progress/me', authenticate, getUserProgress);

export default router;
