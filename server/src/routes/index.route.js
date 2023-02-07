import express from 'express';
import accountRouter from "./user/account.route.js";

const mainRouter = express();

mainRouter.use(accountRouter);

export default mainRouter;
