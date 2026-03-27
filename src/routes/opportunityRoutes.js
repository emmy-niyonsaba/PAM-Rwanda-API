import { Router } from 'express';
import {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
} from '../controllers/opportunityController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', getOpportunities);
router.get('/:id', getOpportunityById);
router.post('/', authenticate, authorize('admin'), createOpportunity);

export default router;
