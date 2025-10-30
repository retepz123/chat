import jwt from 'jsonwebtoken';
import { User } from '../models/user-schema.js';

export async function protectMiddleware(req, res, next) {

console.log("Incoming cookies:", req.cookies);
console.log("Token from cookies:", req.cookies.token);
console.log("Decoded JWT:", decoded);
  try {
   
    const token = req.cookies.token; // match your cookie name token

    if (!token) {
         console.log('❌ No token found in cookies');
      return res.status(401).json({ message: 'Unauthorized - No token provided' });

    }

    // jwt verify takes (token, secret)
    console.log('Cookies:', req.cookies);
    console.log('Token:', req.cookies.token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
       console.log('✅ Token decoded:', decoded);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

   
    const user = await User.findById(decoded.id).select('-password');
      console.log('❌ User not found');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();

  } catch (err) {
    console.error(' Error in protectMiddleware:', err.message);
    return res.status(401).json({ message: 'Unauthorized - Invalid or expired token' });
  }
}
