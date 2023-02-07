import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mainRouter from './routes/index.route.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(mainRouter);

export default app;
