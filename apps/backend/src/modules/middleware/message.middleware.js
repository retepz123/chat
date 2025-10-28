export function validateMessage(req, res, next) {
  try{
    const { senderId, content, room} = req.body;

    if(!senderId || !content || !room) {
      return res.status(400).json({ message: 'Missing required fields'});
    }

    if(typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ message: 'Content must be non-empty string'});
    }

   if (req.body.attachments && !Array.isArray(req.body.attachments)) {
  req.body.attachments = [req.body.attachments]; // wrap single object into array
}

  next();

  } catch (err){
    console.error('Error in fetching the message', err);
    return res.status(500).json({ message: 'Internal server Error in middleware message'});
  }
}

export async function sendMessageSocket(Msgdata){
  try {
    const sender = await User.findById(Msgdata.senderId);
    if (!sender) throw new Error('Cannot find the user');

    const newMessage = await Message.create ({
       sender: msgData.senderId,
      content: msgData.content,
      room: msgData.room,
      attachments: msgData.attachments || [],
    });

      await newMessage.populate('sender', 'username email');
      return newMessage;

  } catch (err) {
      console.error('Error sending message via socket:', err);
    throw err;
  }
}