import express from 'express';
import { validateMessage } from '../middleware/message.middleware.js';
import { sendMessage } from '../controller/chat-controller.js';
import { getUsersForSide } from '../controller/all-users-controller.js';
import { protectMiddleware } from '../middleware/protect-middleware.js';
import {getMessage} from '../controller/all-chat-controller.js'

const router = express.Router();

router.post('/send/:id', protectMiddleware, sendMessage);
router.get('/users', protectMiddleware, getUsersForSide);
router.get('/:id', protectMiddleware, getMessage);

export default router;