import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
// import mainRouter from './routes/index.route.js';
import accountRouter from './routes/user/account.route.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/', accountRouter);

export default app;
