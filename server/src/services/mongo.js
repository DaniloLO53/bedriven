import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
let db = mongoose.connection;

mongoose.set('strictQuery', false);
db.once('open', () => {
  console.log('MongoDB connection is ready');
});

db.on('error', (error) => console.log(error));

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
};

async function mongoDisconnect() {
  await mongoose.disconnect();
};


export {
  db,
  mongoConnect,
  mongoDisconnect,
};
