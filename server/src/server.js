import fs from 'fs';
import path from 'path';
import https from 'https';
import dotenv from 'dotenv';
import app from './app.js';
import { mongoConnect } from './services/mongo.js';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;

async function startServer() {
  await mongoConnect();

  const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

  const server = https.createServer(options, app);
  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};
startServer();
