import express from 'express';
import { validateMessage } from '../middleware/message.middleware.js';
import { sendMessage } from '../controller/chat-controller.js';
import { getAllMessages } from '../controller/all-chat-controller.js';

const router = express.Router();

router.post('/send', validateMessage, sendMessage);
router.get('/all/:room', getAllMessages);


export default router;