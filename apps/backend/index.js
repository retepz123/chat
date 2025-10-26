import express from 'express';
import process from 'node:process';
import mongoose from 'mongoose';
import registerROutes from '../backend/src/modules/routes/routes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;



console.log('MONGO_URL from env:', process.env.MONGO_URL);

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
  origin: "http://localhost:5173",
 methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.set('port', PORT);
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

app.use('/api/auth', registerROutes );

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});