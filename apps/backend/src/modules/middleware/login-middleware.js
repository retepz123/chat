import { User } from '../models/user-schema.js';
import bcrypt from 'bcryptjs';

export async function validateLogin(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'No request body provided' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // hasing password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Wrong credentials' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Error in validateLogin middleware:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
