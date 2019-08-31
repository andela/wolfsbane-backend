
import models from '../models';
import {
  status, messages, hashPassword, generateUserToken,
  successResponse, errorResponse, conflictResponse
} from '../utils/index';

const registerUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userExits = await models.Users.findOne({ where: { email } });
    if (userExits) {
      return conflictResponse(res, status.conflict, messages.signUp.conflict);
    }

    req.body.password = await hashPassword(req.body.password);
    const user = await models.Users.create(req.body);
    const response = user.toJSON();

    delete response.password;

    const token = generateUserToken(user);
    return successResponse(res, status.created, messages.signUp.success, response, token);
  } catch (error) {
    return errorResponse(res, status.error, messages.signUp.error);
  }
};

export default registerUser;
