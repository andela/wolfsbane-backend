import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../../index';
import { status, messages } from '../../utils';

chai.use(chaiHttp);
chai.should();

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
});
