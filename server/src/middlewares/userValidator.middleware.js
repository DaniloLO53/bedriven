import signUpSchema from "../schemas/signUp.schema.js";

function signUpValidator(request, response, next) {
  const signUpData = request.body;
  const validation = signUpSchema.validate(signUpData);

  if (validation.error) return response.status(422).send('Invalid infos');

  next();
};

export {
  signUpValidator,
};

