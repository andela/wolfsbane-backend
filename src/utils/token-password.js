/* eslint-disable camelcase */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);

/**
   * comparePassword
   * @param {string} hashedPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
const comparePassword = (hashedPassword, password) => bcrypt.compareSync(password, hashedPassword);

/**
   * Generate Token
   * @param {string} id
   * @returns {string} token
   */
const generateUserToken = ({ id }) => {
  const token = jwt.sign({
    userId: id
  },
  process.env.SECRET, { expiresIn: '3d' });
  return token;
};

export {
  hashPassword,
  comparePassword,
  generateUserToken,
};
