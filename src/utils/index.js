import {
  status, messages, successResponse, errorResponse, conflictResponse,
} from './responses';
import * as bcrypt from './bcrypt';
import Jwt from './jwt';
import strategyCallback from './passportStrategyCallback';
import getCallbackUrls from './getCallbackUrls';
import emailTemplatesFunction from './emailTemplatesFunction';

const { generateToken, verifyToken } = Jwt;
const { hashPassword, comparePassword } = bcrypt;

export {
  Jwt,
  status,
  messages,
  bcrypt,
  hashPassword,
  generateToken,
  verifyToken,
  comparePassword,
  successResponse,
  errorResponse,
  conflictResponse,
  strategyCallback,
  getCallbackUrls,
  emailTemplatesFunction,
};
