import { User } from '../models/user-schema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(req, res){
  try{
     console.log('✅ Entered login controller');
    console.log('req.user:', req.user);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const user = req.user;

     if (!user) {
      return res.status(400).json({ message: 'User not set in request' });
    }

    //token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '30d'},
    );

  
    return res.status(200).json({ message: `Succesfully login, Welcome ${user.username}`,
    token,
    user: {
      _id: user._id
    }});

  } catch (err){
    console.error('Error fetching data', err);
    return res.status(500).json({ message: 'Internal Server error in login'});
  }
}