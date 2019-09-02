import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

config();

const secretKey = process.env.SECRET;

/**
 * @class Jwt
 * @description class for token generation and verification
 * @exports Jwt
 */
export default class Jwt {
  /**
   * @method generateToken
   * @description Method to generate new token
   * @param {object} payload - The data used to generate the token
   * @param {string} secret - The secret key used to generate the token
   * @returns {string} the generated token
   */
  static async generateToken(payload, secret = secretKey) {
    const token = await jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;
  }

  /**
   * @method verifyToken
   * @description Method to decode the token
   * @param {string} token - The token to be verified
   * @param {string} secret - The secret key used to generate the token
   * @returns {object} the payload decoded from the token
   */
  static async verifyToken(token, secret = secretKey) {
    const decoded = await jwt.verify(token, secret);
    return decoded;
  }
}
