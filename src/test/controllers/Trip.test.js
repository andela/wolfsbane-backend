import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '../../index';
import models from '../../models';
import { TripController } from '../../controllers';
import middleware from '../../middlewares';


const { Authenticate } = middleware;

const { Requests, Trips } = models;
const { updateTrip, createTrip } = TripController;

chai.use(sinonChai);
chai.use(chaiHttp);
const { expect } = chai;

const login = {
  email: 'funmi1@gmail.com',
  password: 'funmi1234'
};
const signinRoute = '/api/v1/users/signin';

let request;
describe('Test for Trip endpoints', () => {
  before(async () => {
    request = chai.request(server).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());
  describe('CREATE A NEW TRIP', () => {
    it('Should be able to create a trip under a request id', (done) => {
      chai
        .request(server)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const trip = {
            origin: 'lagos',
            destination: 'nairobi',
            departureDate: '2019-09-09 01:33:28.862+00',
            travelReasons: 'To get away.',
            typeOfTrip: 'Return',
            roomId: 'b098fb80-72c7-4a9a-a35a-634692384d89',
            accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
          };
          chai.request(server)
            .post('/api/v1/trip/47db7b6c-394f-452b-a09d-19bff77f84d9')
            .set('Authorization', token)
            .send(trip)
            .end((error, response) => {
              expect(response).to.have.status(201);
              expect(response.body).to.have.property('status');
              done();
            });
        });
    });
    it('fakes a server error when creating a trip', async () => {
      const req = {
        params: {
          requestId: '00000000-0000-0000-0000-'
        },
        body: {
          origin: 'lagos',
          destination: 'Botswana',
          departureDate: '2019-09-09 01:33:28.862+00',
          travelReasons: 'To get away.',
          typeOfTrip: 'Return',
          roomId: 'b098fb80-72c7-4a9a-a35a-634692384d89',
          accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Trips, 'update').throws();

      await createTrip(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('UPDATE A TRIP', () => {
    it('should update a trip', async () => {
      const req = {
        params: { id: '77666656-11dc-43f1-a01d-a2444ede9cdd' },
        body: {
          origin: 'lagos',
          destination: 'Botswana',
          departureDate: '2019-09-09 01:33:28.862+00',
          travelReasons: 'To get away.',
          typeOfTrip: 'Return',
          roomId: 'dc9fff35-7a69-43a2-8056-7a1ee99dcbf9',
          accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
        },
        user: { userId: '77666656-11dc-43f1-a01d-a2444ede9cdd' },
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Requests, 'findByPk').returns({ userId: '77666656-11dc-43f1-a01d-a2444ede9cdd', status: 'pending' });
      sinon.stub(Requests, 'findOne').returns(true);
      sinon.stub(Trips, 'findOne').returns(true);
      sinon.stub(models.Trips, 'update').returns(true);
  
      await updateTrip(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });
    it('should return an error if the status of the trip request you are trying to update is not pending', async () => {
      const req = {
        params: { id: 'ee64e4e3-71ac-4ded-a504-f8f54fb0dc12' },
        body: {
          origin: 'lagos',
          destination: 'Botswana',
          departureDate: '2019-09-09 01:33:28.862+00',
          travelReasons: 'To get away.',
          typeOfTrip: 'Return',
          roomId: 'dc9fff35-7a69-43a2-8056-7a1ee99dcbf9',
          accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
        },
        user: { userId: '7aa38d4e-7fbf-4067-8821-9c27d2fb6e3a' },
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Requests, 'findByPk').returns({ userId: '7aa38d4e-7fbf-4067-8821-9c27d2fb6e3a', status: 'approved' });
      sinon.stub(Requests, 'findOne').throws();
      sinon.stub(Trips, 'findOne').throws();
      sinon.stub(models.Trips, 'update').throws();
  
      await updateTrip(req, res);
      expect(res.status).to.have.been.calledWith(422);
    });
    it('should return an error if the user trying to update the trip is not the same user that created it', async () => {
      const req = {
        params: { id: '77666656-11dc-43f1-a01d-a2444ede9cdd' },
        body: {
          origin: 'lagos',
          destination: 'Botswana',
          departureDate: '2019-09-09 01:33:28.862+00',
          travelReasons: 'To get away.',
          typeOfTrip: 'Return',
          roomId: 'dc9fff35-7a69-43a2-8056-7a1ee99dcbf9',
          accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
        },
        user: { userId: 'e71c28fd-73d8-4d92-9125-ab3d022093b0' },
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(Requests, 'findByPk').returns({ userId: 'abab73cb-2455-4e34-9bad-55973b30bc48', status: 'pending' });
  
      await updateTrip(req, res);
      expect(res.status).to.have.been.calledWith(401);
    });
    it('fakes a server error when updating a trip', async () => {
      const req = {
        params: { id: '77666656-11dc-43f1-a01d-a2444ede9cdd' },
        body: {
          origin: 'lagos',
          destination: 'Botswana',
          departureDate: '2019-09-09 01:33:28.862+00',
          travelReasons: 'To get away.',
          typeOfTrip: 'Return',
          roomId: 'dc9fff35-7a69-43a2-8056-7a1ee99dcbf9',
          accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
        },
        user: { userId: '77666656-11dc-43f1-a01d-a2444ede9cdd' }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Trips, 'update').throws();
  
      await updateTrip(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe(' VALIDATE AUTHENTICATION ', () => {
    it('Should return 401 if user is not a validated user with a role on the application', (done) => {
      const notaValidUser = {
        email: 'dele@gmail.com',
        password: 'dele1234'
      };
      chai
        .request(server)
        .post(signinRoute)
        .send(notaValidUser)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const trip = {
            origin: 'lagos',
            destination: 'nairobi',
            departureDate: '2019-09-09 01:33:28.862+00',
            travelReasons: 'To get away.',
            typeOfTrip: 'Return',
            roomId: 'b098fb80-72c7-4a9a-a35a-634692384d89',
            accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
          };
          chai.request(server)
            .post('/api/v1/trip/47db7b6c-394f-452b-a09d-19bff77f84d9')
            .set('Authorization', token)
            .send(trip)
            .end((error, response) => {
              expect(response).to.have.status(401);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('Should return 401 if user is not manager or super admin', (done) => {
      const notaValidRole = {
        email: 'kelechi@gmail.com',
        password: 'kelechi'
      };
      chai
        .request(server)
        .post(signinRoute)
        .send(notaValidRole)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(server)
            .get('/api/v1/request/manager')
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(401);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('should fake an internal server error in verifying the users', async () => {
      const req = {
        user: {
          user: { userId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2' }
        }
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Trips, 'findOne').throws();
      sinon.stub(models.Requests, 'findOne').throws();
  
      await Authenticate.verifyUser(req, res);
      expect(res.status).to.have.been.calledWith(500);
      await Authenticate.verifyRequest(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
