import { User } from '../models/user-schema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(req, res){
  try{
    const user = req.user;


    //token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '30D'},
    );

  
    return res.status(200).json({ message: `Succesfully login, Welcome ${user.username}`,
    token,});

  } catch (err){
    console.error('Error fetching data', err);
    return res.status(500).json({ message: 'Internal Server error'});
  }
}