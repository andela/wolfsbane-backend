/* eslint-disable camelcase */
const messages = {
  signUp: {
    success: 'User Created Successfully',
    error: 'Could not sign up user try again',
    conflict: 'User with that email already exist'
  },
  signIn: {
    success: 'Successfully Signed In',
    notfound: 'User Cannot be found',
    error: 'Could not sign in user try again',
    invalid: 'Invalid Credentials',
    unverified: 'Email not verified, check your mail to verify'
  },
  requests: {
    success: 'The trip request has been created!',
    error: 'Oops, there was an error trying to create a trip request!'
  },
  updateRequests: {
    success: 'Successfully updated!',
    error: 'Oops, there was an error trying to update a trip request!',
    access: 'Sorry, you can not update this resource again...'
  },
  deleteRequests: {
    error: 'Oops, this resouce can not be found!',
    success: 'This action was successful!',
    notFound: 'Oops, you do not have this resource OR you are not permitted to access it!',
    access: 'Sorry, you can not delete this resource again...'
  },
  getRequests: {
    error: 'You do not have any requests...',
    access: 'Sorry, you can not access this resource!'
  },
  getSingleRequests: {
    notFound: 'Oops, you do not have this resource anymore OR permitted to access it!'
  },
  authentication: {
    error: 'Oops, something went wrong...',
    auth: 'Sorry, you are not authorized to access this resource.'
  },
  updateTrips: {
    unauthorized: 'Access denied!'
  },
  managerRequests: {
    success: 'These are all the requests in this department.',
    notFound: 'There are no requests in this department.',
    error: 'Oops, something went wrong...'
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
  unprocessable: 422
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

const successResponse = (res, statusCode, message, userData, token) => forgeResponse(res, statusCode, message, userData, token);

const errorResponse = (res, statusCode, message) => forgeResponse(res, statusCode, message);

const conflictResponse = (res, statusCode, message) => forgeResponse(res, statusCode, message);

export {
  status, successResponse, errorResponse, messages, conflictResponse
};
