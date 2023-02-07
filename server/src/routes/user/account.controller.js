async function signUp(request, response, next) {
  const user = request.body;

  try {
    return response.status(200).send(user);
  } catch (error) {
    console.log('Error on signUp: ', error);

    throw new Error(error);
  }
};

export {
  signUp,
};
