import { User } from '../models/user-schema.js';
import jwt from 'jsonwebtoken';

export async function login(req, res){
  try{
    const user = req.user;
  
    return res.status(200).json({ message: `Succesfully login, Welcome ${user.username}`});

  } catch (err){
    console.error('Error fetching data', err);
    return res.status(500).json({ message: 'Internal Server error'});
  }
}