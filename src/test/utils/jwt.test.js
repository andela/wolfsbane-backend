import chai from 'chai';
import { Jwt } from '../../utils';

const { expect } = chai;

describe('Jwt', () => {
  const payload = { userId: 1 };
  const secret = 'Sheesh!!! it is a secret';
  let token;

  context('generate token', () => {
    it('return a generated token', async () => {
      token = await Jwt.generateToken(payload, secret);
      expect(token).to.be.a('string');
    });
  });
  context('verify token', () => {
    it('return a decoded payload', async () => {
      const decoded = await Jwt.verifyToken(token, secret);
      expect(decoded.userId).to.equal(payload.userId);
    });
  });
});
