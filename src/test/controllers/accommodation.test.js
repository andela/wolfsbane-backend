import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import app from '../../index';
import models from '../../models';
import { AccommodationController } from '../../controllers';


const accommodationRoute = '/api/v1/accommodations';

const signinRoute = '/api/v1/users/signin';
const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);

const login = {
  email: 'funmi1@gmail.com',
  password: 'funmi1234',
};

let request;
describe('Test for Accommodation Endpoints', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());
  describe(`POST ${accommodationRoute}`, () => {
    it('Should return 202 if accommodation is created', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const accommodation = {
            name: faker.company.companyName(),
            address: faker.address.streetAddress(),
            image: faker.image.imageUrl(),
          };
          chai.request(app)
            .post(accommodationRoute)
            .set('Authorization', token)
            .send(accommodation)
            .end((error, response) => {
              expect(response).to.have.status(202);
              expect(response.body).to.have.property('status');
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
          const accommodation = {
            address: faker.address.streetAddress(),
            image: faker.image.imageUrl(),
          };
          chai.request(app)
            .post(accommodationRoute)
            .set('Authorization', token)
            .send(accommodation)
            .end((error, response) => {
              expect(response).to.have.status(422);
              expect(response.body).to.have.property('errors');
              done();
            });
        });
    });
    it('fakes server when creating an accommodation', async () => {
      const req = {
        body: {
          name: faker.company.companyName(),
          address: faker.address.streetAddress(),
          image: faker.image.imageUrl(),
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Accommodations, 'create').throws();

      await AccommodationController.createAccommodation(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe(`PUT ${accommodationRoute}`, () => {
    it('Should return 200 if accommodation is updated', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const accommodation = {
            name: faker.company.companyName(),
            address: faker.address.streetAddress(),
            image: faker.image.imageUrl(),
          };
          chai.request(app)
            .put(`${accommodationRoute}/777f640e-a2ff-45ee-9ce1-bf37645c42d6`)
            .set('Authorization', token)
            .send(accommodation)
            .end((error, response) => {
              expect(response).to.have.status(200);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('message');
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
          const accommodation = {
            address: faker.address.streetAddress(),
            image: faker.image.imageUrl(),
          };
          chai.request(app)
            .put(`${accommodationRoute}/2b770fbc-76e6-4b5a`)
            .set('Authorization', token)
            .send(accommodation)
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
          const accommodation = {
            name: faker.company.companyName(),
            address: faker.address.streetAddress(),
            image: faker.image.imageUrl(),
          };
          chai.request(app)
            .put(`${accommodationRoute}/2b770fbc-76e6-4b5a-afab-882759fd1f09`)
            .set('Authorization', token)
            .send(accommodation)
            .end((error, response) => {
              expect(response).to.have.status(404);
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('fakes server when updating an accommodation', async () => {
      const req = {
        params: {
          accommodationId: '777f640e-a2ff-45ee-9ce1-bf37645c42d6'
        },
        body: {
          name: faker.company.companyName(),
          address: faker.address.streetAddress(),
          image: faker.image.imageUrl(),
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Accommodations, 'update').throws();

      await AccommodationController.updateAccommodation(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe(`DELETE ${accommodationRoute}/:accommodationId`, () => {
    it('Should return 200 if accommodation is deleted', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .delete(`${accommodationRoute}/777f640e-a2ff-45ee-9ce1-bf37645c42d6`)
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(200);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('message');
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
            .delete(`${accommodationRoute}/dc9fff35-7a69-43a2`)
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
            .delete(`${accommodationRoute}/2b770fbc-76e6-4b5a-afab-882759fd1f00`)
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(404);
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('fakes server error when deleting accommodations', async () => {
      const req = {
        params: {
          accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Accommodations, 'destroy').throws();

      await AccommodationController.deleteAccommodation(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe(`GET Single ${accommodationRoute}`, () => {
    it('Should return 200 if all accommodations are fetched', (done) => {
      const superAdmin = {
        email: 'samailabalap@gmail.com',
        password: 'funmi1234',
      };
      chai
        .request(app)
        .post(signinRoute)
        .send(superAdmin)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get(`${accommodationRoute}/2b770fbc-76e6-4b5a-afab-882759fd1f06`)
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
            .get(`${accommodationRoute}/2b770fbc-76e6-4b5a`)
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
          const accommodation = {
            address: faker.address.streetAddress,
            image: faker.image.imageUrl,
          };
          chai.request(app)
            .get(`${accommodationRoute}/2b770fbc-76e6-4b5a-afab-882759fd1f29`)
            .set('Authorization', token)
            .send(accommodation)
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
          accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
        }
      };
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Accommodations, 'findAll').throws();

      await AccommodationController.getAccommodationById(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
  describe(`GET All ${accommodationRoute}`, () => {
    it('Should return 200 if all accommodations are fetched', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          chai.request(app)
            .get(`${accommodationRoute}/`)
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
    it('fakes server error when getting all accommodations', async () => {
      const req = {};
      const res = {
        status: () => { },
        json: () => { },
      };
      sinon.stub(res, 'status').returnsThis();
      sinon.stub(models.Accommodations, 'findAll').throws();

      await AccommodationController.getAccommodation(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe(`Check Token ${accommodationRoute}`, () => {
    it('Should return 500 if there is an error identifying the token', (done) => {
      chai
        .request(app)
        .post(signinRoute)
        .send(login)
        .end((logError, logResponse) => {
          const token = '';
          chai.request(app)
            .get(`${accommodationRoute}/`)
            .set('Authorization', token)
            .end((error, response) => {
              expect(response).to.have.status(401);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
    it('Should return 401 if user is not a travel admin', (done) => {
      const notAdmin = {
        email: 'adelekegbolahan92@yahoo.com',
        password: 'funmi1234',
      };
      chai
        .request(app)
        .post(signinRoute)
        .send(notAdmin)
        .end((logError, logResponse) => {
          const token = `Bearer ${logResponse.body.data.token}`;
          const accommodation = {
            name: faker.company.companyName(),
            address: faker.address.streetAddress(),
            image: faker.image.imageUrl(),
          };
          chai.request(app)
            .post(`${accommodationRoute}/`)
            .set('Authorization', token)
            .send(accommodation)
            .end((error, response) => {
              expect(response).to.have.status(401);
              expect(response.body).to.have.property('status');
              expect(response.body).to.have.property('message');
              done();
            });
        });
    });
  });
});
