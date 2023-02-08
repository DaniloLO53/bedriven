import Joi from 'joi';

const pattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
const passwordError = new Error(`Password must be strong.
At least one upper case alphabet. At least one lower case alphabet. At least one digit.
At least one special character. Minimum eight in length`);
const confirmPasswordError = new Error('Does not match with the password');

const signUpSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  isAdmin: Joi.boolean().required(),
  password: Joi.string().trim().regex(new RegExp(pattern)).error(passwordError).required(),
  confirmPassword: Joi.valid(Joi.ref('password')).error(confirmPasswordError).required(),
});

export default signUpSchema;
