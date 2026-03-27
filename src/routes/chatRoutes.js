import { Router } from 'express';
import {
  getChatMessages,
  createChatMessage,
} from '../controllers/chatController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', getChatMessages);
router.post('/', authenticate, createChatMessage);

export default router;
