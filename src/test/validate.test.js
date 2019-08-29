import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();
const route = '/api/v1/user';

describe('users endpoint test', () => {
  it('should return welcome user', (done) => {
    chai.request(server).get(route).end((error, response) => {
      if (error) throw Error(`Error making test request ${route}`);
      response.should.have.status(200);
      response.body.message.should.equal('welcome user');
      done();
    });
  });
});

describe('validate middleware test', () => {
  it('Should return error for invalid post data', (done) => {
    const dummyUser = {
      firstName: 'john',
      lastName: 'doe',
      password: 'password',
      email: 'invalidMail'
    };
    chai.request(server).post(route).send(dummyUser).end((error, response) => {
      if (error) throw Error(`Error making test request ${route}`);
      response.should.have.status(422);
      response.body.should.have.property('errors');
      const hasEmailErr = !!response.body.errors.email;
      hasEmailErr.should.equal(true);
      done();
    });
  });
  it('Should remove white spaces', (done) => {
    const dummyUser = {
      firstName: '             ',
      lastName: 'doe',
      password: 'password',
      email: 'doe@gmail.com'
    };
    chai.request(server).post(route).send(dummyUser).end((error, response) => {
      if (error) throw Error(`Error making test request ${route}`);
      response.should.have.status(422);
      response.body.should.have.property('errors');
      const hasFirstNameProp = !!response.body.errors.firstName;
      hasFirstNameProp.should.equal(true);
      done();
    });
  });
  it('Should return error for missing parameters', (done) => {
    const dummyUser = {
      firstName: 'Mike',
      lastName: 'doe'
    };
    chai.request(server).post(route).send(dummyUser).end((error, response) => {
      if (error) throw Error(`Error making test request ${route}`);
      response.should.have.status(422);
      response.body.should.have.property('errors');
      done();
    });
  });
  it('Should pass valid request to the next middleware', (done) => {
    const dummyUser = {
      firstName: 'john',
      lastName: 'doe',
      password: 'password',
      email: 'doe@gmail.com'
    };
    chai.request(server).post(route).send(dummyUser).end((error, response) => {
      if (error) throw Error(`Error making test request ${route}`);
      response.should.have.status(201);
      response.body.should.have.property('message');
      done();
    });
  });
});
