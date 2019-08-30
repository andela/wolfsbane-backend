/* eslint-disable camelcase */
const messages = {
  signUp: {
    success: 'User Created Successfully',
    error: 'Could not sign up user try again',
    conflict: 'User with that email already exist'
  }
};

const status = {
  success: 200,
  error: 500,
  notfound: 404,
  unauthorized: 401,
  conflict: 409,
  created: 201,
  bad: 400,
  nocontent: 204,
  unprocessable: 422,
};

const forgeResponse = (res, statusCode, message, data = null, token = null) => {
  const response = {
    status: statusCode,
    message
  };

  if (data) response.data = data;
  if (data && token) response.data.token = token;

  return res.status(statusCode).json(response);
};

const successResponse = (res, statusCode,
  message, userData, token) => forgeResponse(res, statusCode, message, userData, token);

const errorResponse = (res, statusCode, message) => forgeResponse(res, statusCode, message);

const conflictResponse = (res, statusCode, message) => forgeResponse(res, statusCode, message);

export {
  status,
  successResponse,
  errorResponse,
  messages,
  conflictResponse,
};
