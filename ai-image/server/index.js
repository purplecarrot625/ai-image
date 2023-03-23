import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config(); // pull environment variables from dotenv file

const app = express(); // initial express application
app.use(cors());
app.use(express.json({ limit: '50mb' })); // midware

// routes, api endpoints
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

// run server
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL); // special url of mongodb databse
    app.listen(8080, () => console.log('Server started on port 8080')); // callback function and say....
  } catch (error) {
    console.log(error);
  }
};

startServer();
