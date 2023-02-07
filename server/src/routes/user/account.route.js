import express from 'express';
import { signUpValidator } from '../../middlewares/userValidator.middleware.js';
import { signUp } from './account.controller.js';

const accountRouter = express.Router();

accountRouter.post('/sign-up', signUpValidator, signUp);

export default accountRouter;

