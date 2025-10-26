import { Schema } from 'mongoose';
import mongoose from 'mongoose';
import { User } from './user-schema.js';


const messagesSchema = new Schema ({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  room: {
    type: String,       // room name or roomId
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  attachments: [{       // for images/files
  url: { type: String, required: true },
        type: { type: String, enum: ['image', 'video', 'file', 'pdf'], default: 'image' },
  }]
}, { timestamps: true });

export const Message = mongoose.model('Message', messagesSchema);
