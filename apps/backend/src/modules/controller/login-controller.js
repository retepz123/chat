import { User } from '../models/user-schema.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { setTokenCookie } from '../utils/cookie.js';
import cloudinary from '../utils/cloudinary.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(req, res) {
  try {
    console.log('✅ Entered login controller');
    console.log('req.user:', req.user);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const user = req.user;

    if (!user) {
      return res.status(400).json({ message: 'User not set in request' });
    }

    console.log('Entered login controller. req.user:', req.user);


    //token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    //set cookies
    console.log('Generated token:', token);
    setTokenCookie(res, token);

    return res.status(200).json({
      message: `Succesfully login, Welcome ${user.username}`,
      token,
      user: {
        _id: user._id,
          email: user.email,
      },
    });
  } catch (err) {
    console.error('Error fetching data', err);
    return res.status(500).json({ message: 'Internal Server error in login' });
  }
}

export const logout = (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 0 });
    return res.status(200).json({ message: 'Logged out Successfull' });
  } catch (err) {
    console.log('Error in logout Controller', err.message);
    return res.status(500).json({ message: 'Internal Server error in login' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: 'Profile pic is required' });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updateUser = await User.findByIdAndUpdate(userId, {
      profilePic: uploadResponse.secure_url,
    });

    return res.status(200).json(updateUser);
  } catch (err) {
    console.error('Error in update profile', err);
    return res
      .status(500)
      .json({ message: 'internal server updating profile' });
  }
};

export const checkAuth = (req, res) => {
  try{
    return res.status(200).json(req.user);
  } catch (err){
    console.error('Error in update profile', err);
    return res
      .status(500)
      .json({ message: 'internal server in checking Auth' });
  }
}
