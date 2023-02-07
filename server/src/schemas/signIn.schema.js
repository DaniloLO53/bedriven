import Joi from 'joi';

const signInSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

export default signInSchema;
