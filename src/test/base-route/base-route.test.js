import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import { status } from '../../utils';

chai.use(chaiHttp);
chai.should();

const entryRoute = '/api/v1';

// Base Route Test
describe('Base Route Test ', () => {
  it('should return welcome user Welcome to wolfsbane server', (done) => {
    chai.request(server).get(entryRoute).end((error, response) => {
      if (error) throw Error(`Error making test request ${entryRoute}`);
      response.should.have.status(status.success);
      response.body.message.should.equal('Welcome to wolfsbane server');
      done();
    });
  });
});
