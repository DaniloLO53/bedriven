import signUpModel from "../../models/signUp.mongo.js";
import { db } from "../../services/mongo.js";
import chalk from 'chalk';

async function signIn(request, response, next) {
  const { email, password } = request.body;

  try {
    const user = await db.collection('users').findOne({ email });

    if (user) {
      console.log('User: ', chalk.yellow(user))
      return response.status(200).send(user);
    }

    return response.status(401).send('Could not find user');

  } catch (error) {
    console.log('Error on signUp: ', chalk.bgBlue(error));
    return response.sendStatus(500);
  }
};

async function signUp(request, response, next) {
  const { name, email, password } = request.body;

  try {
    const alreadyRegistered = await db.collection('users').findOne({ email });
    if (alreadyRegistered) return response.status(401).send('User already registered');

    const userModel = new signUpModel({
      name,
      email,
      password,
    });
    userModel.save((error, doc) => {
      if (error) {
        return response.status(503).send('Error during record insertion: ', error);
      }

      return response.status(201).send(name);
    });

  } catch (error) {
    console.log('Error on signUp: ', error);

    return response.sendStatus(500);
  }
};

export {
  signUp,
  signIn,
};
