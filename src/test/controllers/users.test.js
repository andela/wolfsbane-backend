import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '../../index';
import models from '../../models';
import { UsersController } from '../../controllers';
import { status, messages } from '../../utils';

chai.use(sinonChai);
chai.use(chaiHttp);
chai.should();
const { expect } = chai;
const { registerUser } = UsersController;

const signUpRoute = '/api/v1/users/signup';

const dummyUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

// User Registration Validation test
describe('User Registration test', () => {
  it('Should return error for invalid User Registration data', (done) => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: 'invalidMail',
      password: faker.internet.password(),
    };
    chai.request(server).post(signUpRoute).send(user).end((error, response) => {
      if (error) throw Error(`Error making test request ${signUpRoute}`);
      response.should.have.status(status.unprocessable);
      response.body.should.have.property('errors');
      const hasEmailErr = !!response.body.errors.email;
      hasEmailErr.should.equal(true);
      done();
    });
  });
  it('Should remove white spaces', (done) => {
    const user = {
      firstName: '             ',
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    chai.request(server).post(signUpRoute).send(user).end((error, response) => {
      if (error) throw Error(`Error making test request ${signUpRoute}`);
      response.should.have.status(status.unprocessable);
      response.body.should.have.property('errors');
      const hasFirstNameProp = !!response.body.errors.firstName;
      hasFirstNameProp.should.equal(true);
      done();
    });
  });
  it('Should return error for missing parameters', (done) => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    };
    chai.request(server).post(signUpRoute).send(user).end((error, response) => {
      if (error) throw Error(`Error making test request ${signUpRoute}`);
      response.should.have.status(status.unprocessable);
      response.body.should.have.property('errors');
      done();
    });
  });

  it('it should  POST a user', (done) => {
    chai.request(server)
      .post(signUpRoute)
      .send(dummyUser)
      .end((err, res) => {
        res.should.have.status(status.created);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(status.created);
        res.body.should.have.property('data');
        res.body.data.should.have.property('token');
        done(err);
      });
  });

  it('it should not POST a user if user exists', (done) => {
    chai.request(server)
      .post(signUpRoute)
      .send(dummyUser)
      .end((err, res) => {
        res.should.have.status(status.conflict);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(status.conflict);
        res.body.should.have.property('message').eql(messages.signUp.conflict);
        done(err);
      });
  });
  afterEach(() => sinon.restore());
  it('fakes a server error during user registration', async () => {
    const req = {
      body: dummyUser
    };
    const res = {
      status: () => {},
      json: () => {},
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Users, 'findOne').throws();

    await registerUser(req, res);
    expect(res.status).to.have.been.calledWith(500);
  });
});


describe('User controller unit test', () => {
  it('return error for invalid request object', async () => {
    // creating an empty req body to generate error
    const req = {};

    // mocking res.status().json
    const res = {
      status: () => ({ json: jsonVal => JSON.stringify(jsonVal) }),
    };
    // call controller with mocked req,res objects
    let returnValue = await registerUser(req, res);
    returnValue = JSON.parse(returnValue);
    chai.expect(returnValue.status).equal(500);
    chai.expect(returnValue).to.have.property('message');
  });
});
