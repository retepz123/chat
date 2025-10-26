import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema ({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  email: {
    type: String,
  },
  

}, {timestamps: true});

export const User = mongoose.model('User', userSchema);