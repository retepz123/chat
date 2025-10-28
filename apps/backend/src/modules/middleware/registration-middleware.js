import { User } from '../models/user-schema.js';
import bcrypt from 'bcryptjs';

export async function validateRegister(req, res, next) {
  console.log('🟩 Middleware Triggered');
  console.log('Request body:', req.body);

  try {
    const { username, password } = req.body;
    console.log('Extracted -> username:', username, '| password:', password);

    // Validate input
    if (!username || !password) {
      console.log('❌ Missing username or password');
      return res.status(400).json({ message: 'Username and Password are required' });
    }

    // Check existing user
    console.log('🔎 Checking for existing user...');
    const existing = await User.findOne({ username: username });
    console.log('Existing user found:', existing);

    if (existing) {
      console.log('⚠️ User already exists');
      return res.status(409).json({ message: 'Already have' });
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Hashed password generated');

    req.body.hashedPassword = hashedPassword;
    console.log('➡️ Passing to next middleware/controller');
    next();

  } catch (err) {
    console.error('💥 Error in Validate Registration:', err);
    return res.status(500).json({ message: 'Internal server in Middleware' });
  }
}
