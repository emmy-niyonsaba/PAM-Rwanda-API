import express from 'express';
import {
  getPanafricanists,
  getPanafricanistById,
  createPanafricanist,
} from '../controllers/panafricanistController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPanafricanists);
router.get('/:id', getPanafricanistById);
router.post('/', authenticate, authorize('admin'), createPanafricanist);

export default router;
