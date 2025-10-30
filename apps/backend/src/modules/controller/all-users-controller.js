import { User } from '../models/user-schema.js';

export async function getUsersForSide(req, res) {
  try {
    const loggedUserId = req.user._id;
    const filteredUsers = await User.find({ _id: {$ne: loggedUserId }}).select('-password');

    return res.status(200).json(filteredUsers);

  } catch (err) {
    console.error('Error fetching the users', err.message);
    return res.status(500).json({ message: 'Internal server Error'});
  }
}