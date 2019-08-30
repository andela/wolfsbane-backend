/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import middlewares from '../../middlewares';

const { validate } = middlewares;

describe('Validate middleware test suite', () => {
  let middleware;
  beforeEach(() => {
    middleware = validate('userRegister');
  });
  it('Should return an array of express-validator middleware', () => {
    expect(middleware).to.be.an('array').that.is.not.empty;
  });
  it('Returned array should be a middleware that calls next', () => {
    // mock request, response and next
    const req = {};
    const res = {};
    const next = () => 'next was called';

    // get out the last middleware which returns the error response or calls next()
    const validatorRes = middleware.pop();

    // check if the middleware actually call's next
    expect(validatorRes(req, res, next)).to.equal('next was called');
  });
});
