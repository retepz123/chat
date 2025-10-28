import { User } from '../models/user-schema.js';
import bcrypt from 'bcryptjs';

export async function register(req, res) {
  console.log('🟡 Entered register controller');
  console.log('Incoming body:', req.body);
  
  try {
    const { username, password, email } = req.body;

     //  Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Save hashed password to DB
    const user = await User.create({
      username,
      password: hashedPassword, 
      email,
    });

    return res.status(201).json({
      message: 'Successfully Created',
      user: {
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    console.error('Error in creating Account', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
