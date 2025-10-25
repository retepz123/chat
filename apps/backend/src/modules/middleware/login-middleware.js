import { User } from '../models/user-schema.js';

export async function ValidateLogin(req, res, next){
  console.log('Request body', req.body);
   const { username, password } =req.body;

  try{
    //validate the username and password
   if(!username || !password){
    return res.status(400).json({ message: 'Invalid credentials'});
   }

     const user = await User.findOne({ username });

    if(!user) {
      return res.status(400).json({ message: 'User not found'});
    }


   if (user.password !== password){
    return res.status(401).json({message: 'Wrong credentials'});
   }
   req.user = user;
   next();


  } catch(err){
    console.error('Error in Fetching data', err);
    return res.status(500).json({ message: 'Internal server in middleware'});
  }
}