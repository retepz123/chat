import {Message} from '../models/messages-schema.js';
import { User } from '../models/user-schema.js';

export async function sendMessage(req, res){
  console.log('Request body', req.body);
  try {
    const { senderId, content, room, attachments } = req.body;

    //validate user
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(400).json({ message: 'Cannot find the User'});
    }

    //create and save message
    const newMessage = new Message({
      sender: senderId,
      content,
      room,
      attachments,
    });

    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully',
      data: newMessage,
    })

  } catch (err){
     console.error('Error sending message:', err);
    res.status(500).json({ message: 'Internal server error' });
  }

}

