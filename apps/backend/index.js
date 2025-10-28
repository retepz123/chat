import express from 'express';
import process from 'node:process';
import mongoose from 'mongoose';
import registerRoutes from './src/modules/routes/routes.js';
import messageRoutes from './src/modules/routes/message-routes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { sendMessageSocket } from './src/modules/middleware/message.middleware.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET:', JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 3000;

//create http server
const server = http.createServer(app);


async function connect() {
  try{
  await mongoose.connect (process.env.MONGO_URL);
  console.log('✅ Connected Successfully');
} catch (err) {
  console.error('👎Unable to connect:', err);
}
}

connect();

app.use(cors({ 
  origin: ["http://localhost:5173", "https://chat-frontend-hiq3.onrender.com"],
 methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.set('port', PORT);
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

app.use('/api/auth', registerRoutes );
app.use('/api/v1', messageRoutes);

//socket.io new server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chat-frontend-hiq3.onrender.com"],
    method: ["GET", "POST"],
    credentials: true,
  },
});

io.on('connect', (socket) => {
  console.log('User connected', socket.id);

  socket.on('joiningRoom', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joing room: ${room}`);
  });

  socket.on('sendMessage', async (Msgdata) => {
    try {
      const newMessage = await sendMessageSocket(Msgdata);
      io.to(Msgdata.room).emit('receive Message', newMessage);
    } catch (err){
      console.error("error in sending message by socket", err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
});
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});