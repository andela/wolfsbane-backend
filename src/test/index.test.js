import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
chai.should();

describe('Base Route Test', () => {
  it('Should return Welcome to Wolfsbane', (done) => {
    chai.request(server).get('/').end((error, response) => {
      if (error) throw Error('Error making test request at "/"');
      response.should.have.status(200);
      response.body.message.should.equal('Welcome to Wolfsbane');
      done();
    });
  });
});
