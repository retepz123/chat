import { Message } from '../models/messages-schema.js';
import { User } from '../models/user-schema.js';

export async function getMessage(req, res){
  try{
    const { id:UserToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or:[{
        senderId:myId, receiverId:UserToChatId
      },
    {senderId:UserToChatId, receiverId:myId}]
    })

    return res.status(200).json(messages)

  } catch (err){
    console.error('Error fetching the messages', err);
    return res.status(500).json ({ message: 'internal server error'});
  }
}