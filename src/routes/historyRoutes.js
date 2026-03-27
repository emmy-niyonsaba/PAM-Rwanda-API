import express from 'express';
import {
  getHistories,
  getHistoryById,
  createHistory,
} from '../controllers/historyController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getHistories);
router.get('/:id', getHistoryById);
router.post('/', authenticate, authorize('admin'), createHistory);

export default router;
