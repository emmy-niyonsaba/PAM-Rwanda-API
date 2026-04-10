import express from 'express';
import { register, login, getUserProfile, updateUserProfile, deleteUserAccount} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.delete('/delete', authenticate, deleteUserAccount);  
    

export default router;
