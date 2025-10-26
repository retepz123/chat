import { Message } from '../models/messages-schema.js'

export async function getAllMessages(req, res) {
  try {
    const { room } = req.params;

    const message = await Message.find({ room })
    .populate('sender', 'username email').sort({ createdAt: 1 })

    return res.status(200).json({ message: 'Messages fetch succesfully', data: message,});


  } catch (err){
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}