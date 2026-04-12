import express from 'express';
import {
  createOpportunity,
  getOpportunities,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity,
} from '../controllers/opportunityController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getOpportunities);
router.get('/:id', getOpportunityById);
router.post('/', authenticate, authorize('admin', 'member'), createOpportunity);
router.put('/:id', authenticate, updateOpportunity);
router.delete('/:id', authenticate, deleteOpportunity);

export default router;
