import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../index';
import models from '../../models';
import ResetPasswordController from '../../controllers/resetPassword';
import { Jwt } from '../../utils';


const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

let request;
describe('RESET PASSWORD', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  context('FORGOT PASSWORD', () => {
    it('should have a status 200 and send password reset link to the supplied email', async function callBack() {
      this.timeout(20000);
      const req = {
        body: {
          email: 'fakemail@mail.com'
        },
        headers: {
          host: 'barefootNomad.heroku.com'
        }
      };
      const res = {
        status: () => {},
        json: () => {}
      };
      const user = {
        id: 'ksd095',
        email: 'fakemail@mail.com',
        password: '9ijk3632',
        createdAt: '2010/10/10'
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Users, 'findOne').returns(user);

      await ResetPasswordController.sendPasswordResetEmail(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
    it('fakes user not found error for sending reset link to user email', async () => {
      const req = {
        body: {
          email: 'fakemail@mail.com'
        }
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Users, 'findOne').returns(null);

      await ResetPasswordController.sendPasswordResetEmail(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('should have a status 422 and return validation errors', async () => {
      const badEmail = {
        email: 'UzumakiNaruto.com'
      };
      const res = await request
        .post('/api/v1/forgotpassword')
        .send(badEmail);
      expect(res).to.have.status(422);
      expect(res.body).to.have.property('errors');
    });
    it('fakes server error setting reset password link', async () => {
      const req = {
        body: {
          email: 'fakemail@mail.com'
        }
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Users, 'findOne').throws();

      await ResetPasswordController.sendPasswordResetEmail(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  context('SET NEW PASSWORD', () => {
    const req = {
      body: {
        password: 'newpassword'
      },
      params: {
        userId: 'ksd095'
      },
      query: {
        token: '98092qnk0k0sdfskn43t9ndsjmjknsf'
      }
    };
    it('fakes server error setting new password', async () => {
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Users, 'findOne').throws();

      await ResetPasswordController.setNewPassword(req, res);
      expect(res.status).to.have.been.calledWith(403);
    });
    it('fakes password reset link invalid error', async () => {
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(res, 'json').returns('Password reset Link invalid');
      sinon.stub(models.Users, 'findOne').returns(false);

      await ResetPasswordController.setNewPassword(req, res);
      expect(res.status).to.have.been.calledWith(403);
    });
    it('fakes a successful reset password change', async () => {
      const res = {
        status: () => {},
        json: () => {},
      };
      const userData = {
        dataValues: {
          id: 'ksd095',
          password: '9ijk3632',
          createdAt: '2010/10/10'
        }
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Users, 'findOne').returns(userData);
      sinon.stub(Jwt, 'verifyToken').returns({ userId: 'ksd095' });
      sinon.stub(models.Users, 'update').returns(true);

      await ResetPasswordController.setNewPassword(req, res);
      expect(res.status).to.have.been.calledWith(202);
    });
    it('should have a status 422 and return an error response', async () => {
      const passwordReset = {
        password: 'jackjones92',
        confirmPassword: 'Jackjones92'
      };
      const res = await request
        .post('/api/v1/resetpassword/klsdjkfmka?token=lkashvbnasjgpsojfas32509849')
        .send(passwordReset);
      expect(res).to.have.status(422);
      expect(res.body).to.have.property('errors');
    });
    it('should have a pass validation and hit the controller', async () => {
      const passwordReset = {
        password: 'Jackjones92',
        confirmPassword: 'Jackjones92'
      };
      const res = await request
        .post('/api/v1/resetpassword/klsdjkfmka?token=lkashvbnasjgpsojfas32509849')
        .send(passwordReset);
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('message');
    });
  });
});
