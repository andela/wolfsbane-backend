import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '../../index';
import models from '../../models';
import { UsersController } from '../../controllers';
import {
  status, messages, Jwt, bcrypt,
} from '../../utils';
import * as services from '../../services';

chai.use(sinonChai);
chai.use(chaiHttp);
chai.should();
const { expect } = chai;
const { registerUser, signInUser, confirmUser } = UsersController;

const signUpRoute = '/api/v1/users/signup';
const signInRoute = '/api/v1/users/signin';


const dummyUser = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

afterEach(() => sinon.restore());

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

  it('fakes successful user signup', async () => {
    const req = {
      body: dummyUser
    };
    const res = {
      status: () => { },
      json: () => { },
    };

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Users, 'findOne').returns(null);
    sinon.stub(services, 'sendEmail').returns({ success: true, message: 'Email sent successfully' });

    await registerUser(req, res);
    expect(res.status).to.have.been.calledWith(status.created);
  });

  it('fakes a conflict when user already exist', async () => {
    const req = {
      body: dummyUser
    };
    const res = {
      status: () => { },
      json: () => { },
    };

    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Users, 'findOne').returns(true);

    await registerUser(req, res);
    expect(res.status).to.have.been.calledWith(status.conflict);
  });
  
  it('fakes a server error during user registration', async () => {
    const req = {
      body: dummyUser
    };
    const res = {
      status: () => { },
      json: () => { },
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Users, 'findOne').throws();

    await registerUser(req, res);
    expect(res.status).to.have.been.calledWith(500);
  });
});


// User Sign In Validation test
describe('User Sign In test', () => {
  it('Should return error for invalid User Sign In data', (done) => {
    const user = {
      email: 'invalidMail',
      password: faker.internet.password(),
    };
    chai.request(server).post(signInRoute).send(user).end((error, response) => {
      if (error) throw Error(`Error making test request ${signInRoute}`);
      response.should.have.status(status.unprocessable);
      response.body.should.have.property('errors');
      const hasEmailErr = !!response.body.errors.email;
      hasEmailErr.should.equal(true);
      done();
    });
  });

  it('Should return error for missing parameters', (done) => {
    const user = {
      email: faker.internet.email(),
    };
    chai.request(server).post(signInRoute).send(user).end((error, response) => {
      if (error) throw Error(`Error making test request ${signInRoute}`);
      response.should.have.status(status.unprocessable);
      response.body.should.have.property('errors');
      done();
    });
  });

  it('it should return a response if user is not found', (done) => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    chai.request(server)
      .post(signInRoute)
      .send(user)
      .end((err, res) => {
        res.should.have.status(status.unauthorized);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(status.unauthorized);
        res.body.should.have.property('message').eql(messages.signIn.invalid);
        done(err);
      });
  });


  it('it should return a response if user is not verified', (done) => {
    const user = {
      email: dummyUser.email,
      password: dummyUser.password
    };
    chai.request(server)
      .post(signInRoute)
      .send(user)
      .end((err, res) => {
        res.should.have.status(status.unauthorized);
        res.body.should.be.a('object');
        res.body.should.have.property('status').eql(status.unauthorized);
        res.body.should.have.property('message').eql(messages.signIn.unverified);
        done(err);
      });
  });


  it('it fakes response if user password is not valid', async () => {
    const req = {
      body: dummyUser
    };
    const res = {
      status: () => { },
      json: () => { },
    };
    const user = {
      id: 'ksd095',
      password: faker.internet.password(),
      firstName: 'King',
      lastName: 'Fresh',
      isVerified: true,
      email: dummyUser.email,
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Users, 'findOne').returns(user);
    await signInUser(req, res);
    expect(res.status).to.have.been.calledWith(status.unauthorized);
  });

  it('fakes a successful user sign in', async () => {
    const req = {
      body: dummyUser
    };
    const res = {
      status: () => { },
      json: () => { },
    };
    const user = {
      id: 'ksd095',
      password: dummyUser.password,
      firstName: 'King',
      lastName: 'Fresh',
      isVerified: true,
      email: dummyUser.email,
    };
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ';
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Users, 'findOne').returns(user);
    sinon.stub(bcrypt, 'comparePassword').returns(true);
    sinon.stub(Jwt, 'generateToken').returns(token);
    await signInUser(req, res);
    expect(res.status).to.have.been.calledWith(status.success);
  });

  it('fakes a server error during user sign in', async () => {
    const req = {
      body: dummyUser
    };
    const res = {
      status: () => { },
      json: () => { },
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Users, 'findOne').throws();

    await signInUser(req, res);
    expect(res.status).to.have.been.calledWith(status.error);
  });
});

describe('User account confirmation test', () => {
  it('should return an error a 403 error for invalid link', async () => {
    const res = await chai.request(server)
      .get('/api/v1/users/confirmAccount?token=098523jmks0-215-23kn55');
    expect(res).to.have.status(403);
    expect(res.body).to.have.property('message').to.equal('Account confirmation link Invalid');
  });

  it('fakes a successful account verication', async () => {
    const res = {
      status: () => { },
      json: () => { },
    };
    const req = {
      query: {
        token: 'klsngajg'
      }
    };
    const userData = {
      id: 'ksd095',
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(Jwt, 'verifyToken').returns({ userId: 'ksd095' });
    sinon.stub(models.Users, 'update').returns(userData);

    await confirmUser(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
});
