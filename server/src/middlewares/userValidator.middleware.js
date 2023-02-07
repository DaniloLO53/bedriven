import signUpSchema from "../schemas/signUp.schema.js";

function signUpValidator(request, response, next) {
  const signUpData = request.body;
  const validation = signUpSchema.validate(signUpData);

  const error = validation.error;

  if (error) return response.status(422).send(error.message);

  next();
};

export {
  signUpValidator,
};

