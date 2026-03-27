import express from 'express';
import {
  createTestimony,
  getTestimonies,
  approveTestimony,
  deleteTestimony,
} from '../controllers/testimonyController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTestimonies);
router.post('/', authenticate, createTestimony);
router.put('/:id/approve', authenticate, authorize('admin'), approveTestimony);
router.delete('/:id', authenticate, deleteTestimony);

export default router;
