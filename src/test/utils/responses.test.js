import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { successResponse, errorResponse } from '../../utils';

chai.use(chaiHttp);
chai.use(sinonChai);
const { expect } = chai;

describe('Response Functions', () => {
  afterEach(() => sinon.restore());

  context('Error Response function', () => {
    it('fakes a call to the error response', async () => {
      const res = {
        status: () => {},
        json: () => {}
      };
      sinon.stub(res, 'status').returnsThis();

      errorResponse(res, 404, 'Not found!');
      expect(res.status).to.have.been.calledWith(404);
    });
  });

  context('Success Response function', () => {
    it('fakes a call to the success response', async () => {
      const res = {
        status: () => {},
        json: () => {}
      };
      sinon.stub(res, 'status').returnsThis();

      successResponse(res, 200, 'Success!');
      expect(res.status).to.have.been.calledWith(200);
    });
  });
});
