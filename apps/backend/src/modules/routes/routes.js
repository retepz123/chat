
import express from 'express';
import { register } from '../controller/registration-controller.js';
import { validateRegister } from '../middleware/registration-middleware.js';
import { login } from '../controller/login-controller.js';
import { validateLogin } from '../middleware/login-middleware.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
