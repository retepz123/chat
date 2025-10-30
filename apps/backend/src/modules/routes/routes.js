
import express from 'express';
import { register } from '../controller/registration-controller.js';
import { validateRegister } from '../middleware/registration-middleware.js';
import { checkAuth, login, logout, updateProfile } from '../controller/login-controller.js';
import { validateLogin } from '../middleware/login-middleware.js';
import { protectMiddleware } from '../middleware/protect-middleware.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.put('/updateProfile', protectMiddleware, updateProfile);
router.get('/check', protectMiddleware, checkAuth);
export default router;
