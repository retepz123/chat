import { Message } from '../models/messages-schema.js';
import { User } from '../models/user-schema.js';

export async function sendMessage(req, res){
  try{
     const { text, image } = req.body;
    const { id: receiverId} = req.params;
    const senderId = req.user._id;

    if (!text && !image) {
  return res.status(400).json({ message: "Message must contain text or image" });
}

    let imageUrl;
    if (image) {
       const uploadResponse = await cloudinary.uploader.upload(image);
       imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message ({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    //socket io

    return res.status(200).json(newMessage);

  } catch(err){
   console.error('Error fetching the messages', err);
   return res.status(500).json({ message: 'Internal server Error in sendMessage'});

  }
}