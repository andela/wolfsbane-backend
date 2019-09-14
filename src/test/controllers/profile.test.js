import chai from 'chai';
import JWT from 'jsonwebtoken';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import faker from 'faker';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '../../index';
import models from '../../models';
import profileController from '../../controllers/profileController';
import middleware from '../../middlewares';

config();
chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

const { Authenticate } = middleware;
const signUpRoute = '/api/v1/users/signup';
const signInRoute = '/api/v1/users/signin';
const profileRoute = '/api/v1/profiles';
const user1 = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isVerified: true,
};
const user2 = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  isVerified: true,
};
const profile1 = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phoneNumber: faker.phone.phoneNumber(),
  department: 'Software Engineering',
  jobDescription: 'Software Engineer',
  imageUrl: 'myPicture.png'
};
const profile2 = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  ...profile1,
  imageUrl: 'myNewImage.png',
  phoneNumber: faker.phone.phoneNumber(),
};

// Profile test
describe('User Profile Test', () => {
  let userToken1;
  let userToken2;
  let createdProfile;
  let profile3;
  let superAdminProfile;
  let superAdminToken;
  
  afterEach(() => sinon.restore());
  
  it('should create a profile for a registered user', async () => {
    try {
      const response = await chai
        .request(server)
        .post(signUpRoute)
        .send(user1);
      response.body.should.have.property('data');
      response.body.data.should.have.property('token');
      userToken1 = response.body.data.token;
      
      const result = await chai
        .request(server)
        .post(profileRoute)
        .set('authorization', `Bearer ${userToken1}`)
        .send(profile1);
      result.should.have.status(201);
      createdProfile = result.body.data;
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should get the profile for a registered user', async () => {
    try {
      const response = await chai
        .request(server)
        .get(`${profileRoute}/${createdProfile.userId}`)
        .set('authorization', `Bearer ${userToken1}`);
      response.should.have.status(200);
    } catch (error) {
      throw new Error(error);
    }
  });
  
    
  it('fakes server error when getting a user\'s profile', async () => {
    const req = {
      params: {
        userId: '88rururbvvv99hdvdinvdv9d9'
      }
    };
    const res = {
      status: () => {},
      json: () => {},
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Profiles, 'findOne').throws();

    await profileController.getProfile(req, res);
    res.status.should.have.been.calledWith(500);
  });
  
  it('fakes server error when getting  all users profile', async () => {
    const req = {
      params: {
        userId: '88rururbvvv99hdvdinvdv9d9'
      },
      query: {
        offset: 0,
        limit: 5
      }
    };
    const res = {
      status: () => {},
      json: () => {},
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Profiles, 'findAll').throws();

    await profileController.getAllProfiles(req, res);
    res.status.should.have.been.calledWith(500);
  });
  
  it('should update the profile for a registered user', async () => {
    try {
      const response = await chai
        .request(server)
        .put(`${profileRoute}/${createdProfile.userId}`)
        .send(profile2)
        .set('authorization', `Bearer ${userToken1}`);
      response.body.data.should.have.property('imageUrl', 'myNewImage.png');
      response.should.have.status(200);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should prevent a user from accessing the profile details of another user', async () => {
    try {
      const response = await chai
        .request(server)
        .post(signUpRoute)
        .send(user2);
      userToken2 = response.body.data.token;
      
      const result = await chai
        .request(server)
        .post(profileRoute)
        .set('authorization', `Bearer ${userToken2}`)
        .send(profile1);
      result.should.have.status(201);
      profile3 = result.body.data;
      
      const newResponse = await chai
        .request(server)
        .put(`${profileRoute}/${profile3.userId}`)
        .send(profile2)
        .set('authorization', `Bearer ${userToken1}`);
      newResponse.should.have.status(401);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should prevent a user who is not the Super Admin from accessing super admin routes', async () => {
    try {
      const response = await chai
        .request(server)
        .get(profileRoute)
        .send(profile2)
        .set('authorization', `Bearer ${userToken1}`);
      response.should.have.status(401);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should throw a server error with authorization not set', async () => {
    try {
      const response = await chai
        .request(server)
        .get(`${profileRoute}/${createdProfile.userId}`);
      response.should.have.status(500);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should deny a request without a token', async () => {
    try {
      const response = await chai
        .request(server)
        .get(`${profileRoute}/${createdProfile.userId}`)
        .set('authorization', 'Bearer ');
      response.should.have.status(401);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should get all the profiles for the Super Admin', async () => {
    try {
      const response = await chai
        .request(server)
        .post(signInRoute)
        .send({ email: 'funmi1@gmail.com', password: 'funmi1234' });
      response.should.have.status(200);
      response.body.data.should.have.property('token');
      superAdminProfile = response.body.data;
      superAdminToken = superAdminProfile.token;
      
      const result = await chai
        .request(server)
        .get('/api/v1/profiles')
        .set('authorization', `Bearer ${superAdminToken}`);
      result.should.have.status(200);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should get all the profiles of a department for the Manager', async () => {
    let managerToken;
    try {
      const response = await chai
        .request(server)
        .post(signInRoute)
        .send({ email: 'adelekegbolahan92@yahoo.com', password: 'funmi1234' });
      response.should.have.status(200);
      response.body.data.should.have.property('token');
      managerToken = response.body.data.token;
      
      const result = await chai
        .request(server)
        .get('/api/v1/profiles')
        .set('authorization', `Bearer ${managerToken}`);
      result.should.have.status(200);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should allow the Super Admin to change roles', async () => {
    try {
      const result = await chai
        .request(server)
        .put(`/api/v1/profiles/${createdProfile.userId}/roles`)
        .set('authorization', `Bearer ${superAdminToken}`)
        .send({ role: 'Manager' });
      result.should.have.status(200);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should catch internal server errors when the Super Admin intends to change roles', async () => {
    try {
      const result = await chai
        .request(server)
        .put(`/api/v1/profiles/${createdProfile.userId}/roles`)
        .set('authorization', `Bearer ${superAdminToken}`)
        .send({ role: 'CTO' });
      result.should.have.status(500);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should fake an internal server error in verifying all the admins', async () => {
    const req = {
      user: {
        userId: superAdminProfile.userId
      }
    };
    const res = {
      status: () => {},
      json: () => {},
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Profiles, 'findOne').throws();

    await Authenticate.verifySuperAdmin(req, res);
    res.status.should.have.been.calledWith(500);
    await Authenticate.verifyTravelAdmin(req, res);
    res.status.should.have.been.calledWith(500);
    await Authenticate.verifyProfileRights(req, res);
    res.status.should.have.been.calledWith(500);
    await Authenticate.verifySuperOrManager(req, res);
    res.status.should.have.been.calledWith(500);
  });
  
  it('should deny a request with a token that doesn\'t decode into a userID', async () => {
    try {
      const fakeToken = JWT.sign({ name: 'My name' }, process.env.SECRET);
      const response = await chai
        .request(server)
        .get(`${profileRoute}/${createdProfile.userId}`)
        .set('authorization', `Bearer ${fakeToken}`);
      response.should.have.status(401);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should catch internal server errors when creating profiles', async () => {
    try {
      const response = await chai
        .request(server)
        .post(profileRoute)
        .send({ ...profile2, department: 'DevOps' })
        .set('authorization', `Bearer ${userToken1}`);
      response.should.have.status(500);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should catch internal server errors when updating profiles', async () => {
    try {
      const response = await chai
        .request(server)
        .put(`${profileRoute}/${createdProfile.userId}`)
        .send({ ...profile2, department: undefined })
        .set('authorization', `Bearer ${userToken1}`);
      response.should.have.status(500);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  it('should fail when passed a profileId that doesn\'t exist', async () => {
    try {
      const response = await chai
        .request(server)
        .get(`${profileRoute}/36da1ce3-8e1f-4b0f-8e15-1189d8231ef2`)
        .set('authorization', `Bearer ${superAdminToken}`);
      response.should.have.status(404);
    } catch (error) {
      throw new Error(error);
    }
  });
});
