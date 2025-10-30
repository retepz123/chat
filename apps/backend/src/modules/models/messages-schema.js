import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { User } from './user-schema.js';


const messagesSchema = new Schema ({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
}, { timestamps: true });

export const Message = mongoose.model('Message', messagesSchema);
