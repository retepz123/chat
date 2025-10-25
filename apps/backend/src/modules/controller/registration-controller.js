import { User } from '../models/user-schema.js';

export async function register(req, res) {
  console.log('Request body', req.body);
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    return res.status(200).json({ message: 'Successfully Created', user:{
      username: user.username,
      password: user.password,
    } 
  });


  } catch (err) {
    console.error('Error in creating Account', err);
    return res.status(500).json({ message: 'Internal Server Error'});
  }
}