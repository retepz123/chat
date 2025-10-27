import { User } from '../models/user-schema.js';

export async function register(req, res) {
  console.log('Request body', req.body);
  try {
    const { username, hashedPassword, email } = req.body;

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
