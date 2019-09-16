import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import faker from 'faker';
import server from '../../index';
import models from '../../models';
import { RequestController } from '../../controllers';

const {
  getATripRequest, getAllTripRequests, deleteRequest, createRequest,
  managerGetRequest,
} = RequestController;

const { Requests } = models;

chai.use(sinonChai);
chai.use(chaiHttp);
const { expect } = chai;

const login = {
  email: 'funmi1@gmail.com',
  password: 'funmi1234'
};
const signinRoute = '/api/v1/users/signin';

let request;
describe('Test for Requests endpoints', () => {
  before(async () => {
    request = chai.request(server).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());
  describe('CREATE A NEW REQUEST', () => {
    it('Should be able to create a request', (done) => {
      chai
        .request(server)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(server)
            .post('/api/v1/request/36da1ce3-8e1f-4b0f-8e15-1189d8231ef2')
            .set('Authorization', token)
            .send({ lineManagerMail: faker.internet.email() })
            .end((error, response) => {
              expect(response).to.have.status(201);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('data');
              done();
            });
        });
    });
    it('fakes a server error when creating a request', async () => {
      const req = {
        params: { departmentId: '7bf531f4-767d-407c-ac9b-142c63df7705' },
        body: {
          lineManagerMail: faker.internet.email()
        },
        user: {
          userId: '7bf531f4-767d-407c-ac9b-142c63df7705',
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'create').throws();
    
      await createRequest(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });


  describe('DELETE SINGLE REQUEST', () => {
    it('fake deleting a request', async () => {
      const req = {
        params: {
          id: '47db7b6c-394f-452b-a09d-19bff77f84d9'
        },
        user: { userId: '89e942c0-0ac2-4beb-83ae-9c1355d6a98b' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Requests, 'findOne').returns({ userId: '89e942c0-0ac2-4beb-83ae-9c1355d6a98b', status: 'pending' });
      sinon.stub(Requests, 'destroy').returns(true);
    
      await deleteRequest(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
    it('should return an error if request to be deleted is not found', async () => {
      const req = {
        params: {
          id: '47db7b6c-394f-452b-a09d-19bff77f84d9'
        },
        user: { userId: '89e942c0-0ac2-4beb-83ae-9c1355d6a98b' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Requests, 'findOne').returns(null);
      
      await deleteRequest(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('should return an error if the request that needs to be deleted is not pending', async () => {
      const req = {
        params: {
          id: '47db7b6c-394f-452b-a09d-19bff77f84d9'
        },
        user: { userId: '89e942c0-0ac2-4beb-83ae-9c1355d6a98b' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Requests, 'findOne').returns({ userId: '89e942c0-0ac2-4beb-83ae-9c1355d6a98b', status: 'approved' });
          
      await deleteRequest(req, res);
      expect(res.status).to.have.been.calledWith(422);
    });
    it('fakes server error when trying to delete a trip request', async () => {
      const req = {
        params: { id: '' },
        user: { userId: '' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'destroy').throws();

      await deleteRequest(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('GET ALL REQUESTS', () => {
    it('should get all trip requests', (done) => {
      chai
        .request(server)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(server)
            .get('/api/v1/request')
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(200);
              expect(response.body).to.have.property('status');
              done();
            });
        });
    });
    it('should return an error if invalid user wants to get all requests or there are no requests', async () => {
      const req = {
        params: { id: 'f1daf099-62cf-4851-a600-7d5321f9b5d4' },
        user: { userId: 'f1daf099-62cf-4851-a600-7d5321f9b5d4' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'findAll').returns([]);
  
      await getAllTripRequests(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('fakes server error when getting all trip requests', async () => {
      const req = {
        params: { },
        user: { userId: '' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'findAll').throws();

      await getAllTripRequests(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('GET A SINGLE REQUEST', () => {
    it('should get a single request', async () => {
      const req = {
        params: { id: '47db7b6c-394f-452b-a09d-19bff77f84d9' },
        user: { userId: 'e71c28fd-73d8-4d92-9125-ab3d022093b9' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'findOne').returns(true);

      await getATripRequest(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
    it('should return an error if no request found', async () => {
      const req = {
        params: { id: 'f1daf099-62cf-4851-a600-7d5321f9b0l8' },
        user: { userId: 'f1daf099-62cf-4851-a600-7d5321f9b5d4' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'findOne').returns(null);

      await getATripRequest(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('fakes server error when getting a trip request', async () => {
      const req = {
        params: {
          id: '3298bd0d-14ab-4300-b56c-d790ac4a14f9'
        },
        user: { userId: '' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'findByPk').throws();

      await getATripRequest(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('MANAGER SHOULD GET EVERY REQUEST IN HER DEPTARTMENT', () => {
    it('should return all requests in a department', async () => {
      const req = {
        params: { departmentId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2' },
        user: { userId: 'f1daf099-62cf-4851-a600-7d5321f9b5d4' },
        query: {
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'findAll').returns(true);
        
      await managerGetRequest(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
    it('should return all requests in a department in whatever state specified', async () => {
      const req = {
        params: { departmentId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2' },
        user: { userId: 'f1daf099-62cf-4851-a600-7d5321f9b5d4' },
        query: {
          status: 'pending'
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'findAll').returns(true);
          
      await managerGetRequest(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
    it('should return an error if no requests are found in a department', async () => {
      const req = {
        params: { departmentId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2' },
        user: { userId: 'f1daf099-62cf-4851-a600-7d5321f9b5d4' },
        query: {
          status: 'pending'
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'findAll').returns(null);
          
      await managerGetRequest(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    it('fakes a server error when manager tries to get requests', async () => {
      const req = {
        params: { departmentId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2' },
        user: { userId: 'f1daf099-62cf-4851-a600-7d5321f9b5d4' },
        query: {
          status: 'pending'
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'findAll').throws();
          
      await managerGetRequest(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
    it('should return an error if invalid user trying to get requests in a department', async () => {
      const req = {
        params: { departmentId: 'f1daf099-62cf-4851-a600-7d5321f9b0l8' },
        user: { userId: '2e2e18b9-8bf8-43c3-b19a-c36477dc47b6' },
        query: { status: 'pending' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Requests, 'findOne').throws();

      await managerGetRequest(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
