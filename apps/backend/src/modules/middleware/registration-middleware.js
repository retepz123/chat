import { User } from '../models/user-schema.js';

export async function validateRegister(req, res, next) {
  console.log('Request body', req.body);
  try {
    const { username, password} = req.body;

    //validate the input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and Password are required'});
    }

    //if user is existing
    const existing = await User.findOne({ username: username});
    if(existing){
      return res.status(409).json({ message: 'Already have'});
    }
    next();

  } catch (err){
    console.error('Error in Validate Registration:', err);
    return res.status(500).json({ message: 'Internal server in Middleware'});
  }
}