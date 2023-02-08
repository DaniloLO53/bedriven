import express, { response } from 'express';
import {
  signInValidator,
  signUpValidator,
} from '../../middlewares/userValidator.middleware.js';
import { deleteUser, signIn, signUp } from './account.controller.js';

const accountRouter = express.Router();

accountRouter.post('/sign-up', signUpValidator, signUp);
accountRouter.post('/sign-in', signInValidator, signIn);
accountRouter.delete('/delete-user/:userId', deleteUser, (request, response) => {
  if (request.user._id === request.params.userId || request.user.isAdmin) {
    return response.status(200).send('Deleted!');
  } else {
    return response.status(403).send('You cannot delete this account');
  }
});

export default accountRouter;
