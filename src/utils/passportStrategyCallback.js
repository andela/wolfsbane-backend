import models from '../models';
import config from '../config';
import { hashPassword } from './token-password';

/**
   * It uses the done method to return an authenticated user or an error object
   * @function strategyCallback
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {Object} profile
   * @param {function} done
   * @returns {Object} (user | error)
*/
const strategyCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    if (!profile) return done(null, undefined);
    const email = profile.emails[0].value;
    const existingUser = await models.Users.findOne({ where: { email } });
    if (existingUser) {
      return done(null, existingUser);
    }
    const { name: { familyName: lastName, givenName: firstName } } = profile;
    const password = hashPassword(config.password);
    const { dataValues } = await models.Users.create({
      firstName, lastName, email, password, isVerified: true
    });
    return done(null, dataValues);
  } catch (error) {
    return done(error, null);
  }
};

export default strategyCallback;
