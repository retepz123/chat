import express from 'express';
import process from 'node:process';
import mongoose from 'mongoose';
import registerRoutes from './src/modules/routes/routes.js';
import messageRoutes from './src/modules/routes/message-routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import  {sendMessageSocket}  from './src/modules/middleware/message.middleware.js'; // make sure this is exported correctly

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET:', JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ 
  origin: ["http://localhost:5173", "https://chat-frontend-hiq3.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.use('/api/auth', registerRoutes);
app.use('/api/v1', messageRoutes);

// Wrap Express with HTTP server
const server = http.createServer(app);

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-frontend-hiq3.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('joiningRoom', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joining room: ${room}`);
  });

  socket.on('sendMessage', async (msgData) => {
    try {
      const newMessage = await sendMessageSocket(msgData);
      io.to(msgData.room).emit('receiveMessage', newMessage);
    } catch (err) {
      console.error("Error sending message via socket:", err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Connect MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected Successfully');
  } catch (err) {
    console.error('👎 Unable to connect:', err);
  }
}

connectDB();

// Start server
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
