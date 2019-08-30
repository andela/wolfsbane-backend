import chai from 'chai';

import { hashPassword, comparePassword } from '../../utils';

const { expect } = chai;

describe('Brypt', () => {
  const password = 'uthdev92';
  let passwordHash;

  context('generate Password hash', () => {
    it('generate a new hash for the password', async () => {
      passwordHash = hashPassword(password);
      expect(passwordHash).to.be.a('string');
    });
  });

  context('compare password with ', () => {
    it('compare the password  with the hash', async () => {
      const isMatch = comparePassword(passwordHash, password);
      expect(isMatch).to.equal(true);
    });
  });
});
