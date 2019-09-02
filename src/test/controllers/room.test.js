import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../index';
import models from '../../models';
import { RoomController } from '../../controllers';

const roomRoute = '/api/v1/rooms';
const signinRoute = '/api/v1/users/signin';
const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);


const login = {
  email: 'funmi1@gmail.com',
  password: 'funmi1234',
};

let request;
describe('Test for Room Endpoints', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());
  describe('POST /api/v1/accommodations/:accommodationId/rooms', () => {
    it('Should return 202 if room is created', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const room = {
            type: 'Ranch',
            capacity: 5,
            image: 'anything',
          };
          chai.request(app)
            .post('/api/v1/accommodations/b356097c-c6d0-4a3d-85f6-33bc2595c974/rooms')
            .set('Authorization', token)
            .send(room)
            .end((error, response) => {
              expect(response).to.have.status(202);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('data');
              done();
            });
        });
    });
    it('Should return 422 for invalid room data', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const room = {
            type: 'Ranch',
            capacity: 'A',
            image: ''
          };
          chai.request(app)
            .post('/api/v1/accommodations/b356097c-c6d0-4a3d-85f6-33bc2595c974/rooms')
            .set('Authorization', token)
            .send(room)
            .end((error, response) => {
              expect(response).to.have.status(422);
              expect(response.body).to.have.property('errors');
              done();
            });
        });
    });
    it('Should return 404 if accommodation not found', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const room = {
            type: 'Ranch',
            capacity: 5
          };
          chai.request(app)
            .post('/api/v1/accommodations/b356097c-c6d0-4a3d-85f6-33bc2595c800/rooms')
            .set('Authorization', token)
            .send(room)
            .end((error, response) => {
              expect(response).to.have.status(404);
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('fakes server when creating a room', async () => {
      const req = {
        params: {
          accommodationId: 'b356097c-c6d0-4a3d-85f6-33bc259qw574'
        },
        body: {
          type: 'Ranch',
          capacity: 5
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Rooms, 'create').throws();

      await RoomController.createRoom(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe(`GET  ${roomRoute}/:roomId`, () => {
    it('Should return 200 if all rooms are fetched', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get(`${roomRoute}/dc9fff35-7a69-43a2-8056-7a1ee99dcbf9`)
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(200);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('message');
              expect(response.body).to.have.property('data');
              done();
            });
        });
    });
    it('Should return 422 for invalid room data', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get(`${roomRoute}/2b770fbc-76e6-4b5a`)
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(422);
              expect(response.body).to.have.property('errors');
              done();
            });
        });
    });
    it('Should return 404 if room not found', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get(`${roomRoute}/2b770fbc-76e6-4b5a-afab-882759fd1f29`)
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(404);
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('fakes server error when getting single accommodations', async () => {
      const req = {
        params: {
          roomId: 'dc9fff35-7a69-43a2-8056-7a1ee99dcbf9'
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Rooms, 'findAll').throws();

      await RoomController.getRoomById(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe(`PUT ${roomRoute}/:roomId`, () => {
    it('Should return 200 if room is updated', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const room = {
            type: 'Ranches',
            capacity: 5,
            image: 'anything'
          };
          chai.request(app)
            .put(`${roomRoute}/dc9fff35-7a69-43a2-8056-7a1ee99dcbf9`)
            .set('Authorization', token)
            .send(room)
            .end((error, response) => {
              expect(response).to.have.status(200);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('Should return 422 for invalid room data', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const room = {
            type: 'Ranch',
            capacity: 5
          };
          chai.request(app)
            .put(`${roomRoute}/dc9fff35-7a69-43a2`)
            .set('Authorization', token)
            .send(room)
            .end((error, response) => {
              expect(response).to.have.status(422);
              expect(response.body).to.have.property('errors');
              done();
            });
        });
    });
    it('Should return 404 if room not found', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const room = {
            type: 'Ranch',
            capacity: 5
          };
          chai.request(app)
            .put(`${roomRoute}/dc9fff35-7a69-43a2-8056-7a1ee99dcbf3`)
            .set('Authorization', token)
            .send(room)
            .end((error, response) => {
              expect(response).to.have.status(404);
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('fakes server error when updating a room', async () => {
      const req = {
        params: {
          roomId: 'dc9fff35-7a69-43a2-8056-7a1ee99dcbf9'
        },
        body: {
          type: 'Ranches',
          capacity: 5,
          image: 'anything'
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Rooms, 'update').throws();

      await RoomController.updateRoom(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe(`DELETE ${roomRoute}/:roomId`, () => {
    it('Should return 200 if room is deleted', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .delete(`${roomRoute}/dc9fff35-7a69-43a2-8056-7a1ee99dcbf9`)
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(200);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('Should return 422 for invalid room data', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .delete(`${roomRoute}/dc9fff35-7a69-43a2`)
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(422);
              expect(response.body).to.have.property('errors');
              done();
            });
        });
    });
    it('Should return 404 if room not found', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .delete(`${roomRoute}/dc9fff35-7a69-43a2-8056-7a1ee99dcbf3`)
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(404);
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('fakes server error when deleting a room', async () => {
      const req = {
        params: {
          roomId: '5402e279-9447-4ac6-98c8-44cf10e27f4e'
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Rooms, 'destroy').throws();

      await RoomController.deleteRoom(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe('GET  accommodations/:accommodationId/rooms', () => {
    it('Should return 200 if all rooms are fetched', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get('/api/v1/accommodations/b356097c-c6d0-4a3d-85f6-33bc2595c974/rooms')
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(200);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('message');
              expect(response.body).to.have.property('data');
              done();
            });
        });
    });
    it('Should return 422 for invalid accommodation data', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get('/api/v1/accommodations/b356097c-4a3d-85f6-33bc2595c974/rooms')
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(422);
              expect(response.body).to.have.property('errors');
              done();
            });
        });
    });
    it('Should return 404 if accommodation not found', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get('/api/v1/accommodations/44d4c4ef-7da7-4e44-be4a-9bdc1b9549a9/rooms')
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(404);
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('fakes server error when getting rooms', async () => {
      const req = {
        params: {
          accommodationId: 'b356097c-c6d0-4a3d-85f6-33bc2595c974'
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Rooms, 'findAll').throws();

      await RoomController.getRoomByAccommodation(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
