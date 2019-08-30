import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';

chai.use(chaiHttp);
chai.should();

describe('Social Authentication Test', () => {
  it('Should return a Google authenticated user', async () => {
    const response = await chai.request(server).get('/api/v1/auth/google/callback');
    response.should.have.status(200);
    response.body.should.have.property('token');
  });
  it('Should return a Facebook authenticated user', async () => {
    const response = await chai.request(server).get('/api/v1/auth/facebook/callback');
    response.should.have.status(200);
    response.body.should.have.property('token');
  });
  it('Should detect an unauthenticated user', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/auth/google/callback')
      .set('testerror', 'unauthorized');
    response.should.have.status(500);
    response.body.should.have.property('message');
  });
  it('Should detect internal server error', async () => {
    const response = await chai
      .request(server)
      .get('/api/v1/auth/facebook/callback')
      .set('testerror', 'serverError');
    response.should.have.status(500);
    response.body.should.have.property('message');
  });
});
