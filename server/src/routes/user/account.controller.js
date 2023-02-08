import signUpModel from "../../models/signUp.mongo.js";
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { db } from "../../services/mongo.js";
import chalk from 'chalk';

async function deleteUser(request, response, next) {
  const auth = request.headers.authorization;

  try {
    if (auth) {
      const token = auth.split(' ')[1];

      jwt.verify(token, 'admin', (error, payload) => {
        if (error) return response.status(403).send('Token incorrect');

        request.user = payload;
        next();
      });
    } else {
      return response.status(401).send('Not auth')
    }
  } catch (error) {
    console.log('Error', error);

    return response.sendStatus(500);
  }
};

async function signIn(request, response, next) {
  const { email, password } = request.body;

  try {
    const user = await db.collection('users').findOne({ email });

    if (user && password === user.password) {

      const token = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin
      }, 'admin');

      return response.status(200).send({ ...user, token });
    };

    return response.status(401).send('Could not find user');

  } catch (error) {
    console.log('Error on signIn: ', chalk.blue(error));
    return response.sendStatus(500);
  }
};

async function signUp(request, response, next) {
  const { name, email, password, isAdmin } = request.body;

  try {
    const alreadyRegistered = await db.collection('users').findOne({ email });
    if (alreadyRegistered) return response.status(401).send('User already registered');

    const userModel = new signUpModel({
      name,
      email,
      password,
      isAdmin,
    });
    userModel.save((error, doc) => {
      if (error) {
        return response.status(503).send('Error during record insertion: ', error);
      }

      return response.sendStatus(201);
    });

  } catch (error) {
    console.log('Error on signUp: ', error);

    return response.sendStatus(500);
  }
};

export {
  signUp,
  signIn,
  deleteUser,
};
