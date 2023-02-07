import express from 'express';
import {
  signInValidator,
  signUpValidator,
} from '../../middlewares/userValidator.middleware.js';
import { signIn, signUp } from './account.controller.js';

const accountRouter = express.Router();

accountRouter.post('/sign-up', signUpValidator, signUp);
accountRouter.post('/sign-in', signInValidator, signIn);

export default accountRouter;
