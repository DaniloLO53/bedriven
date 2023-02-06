import https from 'https';
import dotenv from 'dotenv';
import app from './app.js';
import mongoose from 'mongoose';
import { mongoConnect } from './services/mongo.js';

dotenv.config();

const PORT = process.env.PORT;

async function startServer() {
  await mongoConnect();

  const server = https.createServer(app);
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};
startServer();

