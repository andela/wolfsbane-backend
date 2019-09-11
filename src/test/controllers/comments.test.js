import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { status } from '../../utils';
import server from '../../index';
import models from '../../models';
import { CommentsController } from '../../controllers';

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();
const user = {
  email: 'funmi1@gmail.com',
  password: 'funmi1234',
};

const signinRoute = '/api/v1/users/signin';

const comment = {
  comment: 'my added comment'
};

const nocomment = {
  comment: ''
};

// ADD comment Testing
describe('/POST add new comment', () => {
  it('it should not ADD a comment if auth token is not provided', (done) => {
    chai.request(server)
      .post('/api/v1/requests/2b770fbc-76e6-4b5a-afab-882759fd1f06/comments')
      .send(comment)
      .end((err, res) => {
        res.should.have.status(status.error);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Server error');
        done(err);
      });
  });

  it('it should return a response requestId is not valid', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
    
        chai.request(server)
          .post('/api/v1/requests/2b770fbc-76e6-4b5a-afab-882759fd1f07/comments')
          .set('Authorization', token)
          .send(comment)
          .end((err, res) => {
            res.should.have.status(status.notfound);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Request does not exist');
            done(err);
          });
      });
  });

  it('Should return error for invalid comment data', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(server)
          .post('/api/v1/requests/2b770fbc-76e6-4b5a-afab-882759fd1f07/comments')
          .set('Authorization', token)
          .send(nocomment)
          .end((err, res) => {
            res.should.have.status(status.unprocessable);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            done(err);
          });
      });
  });

  it('it should post comment', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
    
        chai.request(server)
          .post('/api/v1/requests/2b770fbc-76e6-4b5a-afab-882759fd1f06/comments')
          .set('Authorization', token)
          .send(comment)
          .end((err, res) => {
            res.should.have.status(status.created);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Comment added successfully');
            done(err);
          });
      });
  });

  it('fakes server when adding an comment', async () => {
    const req = {
      body: {
        comment: 'my added comment'
      },
      user: {
        userId: 'e71c28fd-73d8-4d92-9125-ab3d022093b9',

      },
      params: {
        requestId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
      }
    };
    const res = {
      status: () => { },
      json: () => { },
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Comments, 'create').throws();

    await CommentsController.addComment(req, res);
    expect(res.status).to.have.been.calledWith(status.error);
  });
});


// GET Single comment Testing
describe('/GET Single comment', () => {
  it('it should return a response if comment is not found', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(server)
          .get('/api/v1/comments/2b770fbc-76e6-4b5a-afab-882759fd1f04')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(status.notfound);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Comment not found');
            done(err);
          });
      });
  });

  it('Should return comment', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(server)
          .get('/api/v1/comments/2b770fbc-76e6-4b5a-afab-882759fd1f06')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Comment retrieved successfully');
            res.body.should.have.property('data');
            done(err);
          });
      });
  });

  it('fakes server when retreiving a comment', async () => {
    const req = {
      params: {
        commentId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
      }
    };
    const res = {
      status: () => { },
      json: () => { },
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Comments, 'findOne').throws();

    await CommentsController.getCommentById(req, res);
    expect(res.status).to.have.been.calledWith(status.error);
  });
});

// UPDATE Single comment Testing
describe('/PUT Single comment', () => {
  it('it should return a response commentId is not valid', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(server)
          .put('/api/v1/comments/2b770fbc-76e6-4b5a-afab-882759fd1f04')
          .set('Authorization', token)
          .send(comment)
          .end((err, res) => {
            res.should.have.status(status.notfound);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Comment not found');
            done(err);
          });
      });
  });
  it('Should return error for invalid comment data', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(server)
          .put('/api/v1/comments/2b770fbc-76e6-4b5a-afab-882759fd1f06')
          .set('Authorization', token)
          .send(nocomment)
          .end((err, res) => {
            res.should.have.status(status.unprocessable);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            done(err);
          });
      });
  });
  it('Should update a comment', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(server)
          .put('/api/v1/comments/2b770fbc-76e6-4b5a-afab-882759fd1f06')
          .set('Authorization', token)
          .send(comment)
          .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Comment updated successfully');
            done(err);
          });
      });
  });

  it('fakes server when updating a comment', async () => {
    const req = {
      body: {
        comment: 'updated comment'
      },
      params: {
        commentId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
      }
    };
    const res = {
      status: () => { },
      json: () => { },
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Comments, 'update').throws();

    await CommentsController.updateCommentById(req, res);
    expect(res.status).to.have.been.calledWith(status.error);
  });
});

// DELETE Single comment Testing
describe('/DELETE Single comment', () => {
  it('it should return a response when comment is deleted', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(server)
          .delete('/api/v1/comments/2b770fbc-76e6-4b5a-afab-882759fd1f06')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Comment deleted successfully');
            done(err);
          });
      });
  });

  it('it should return a response when comment is not found', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(server)
          .delete('/api/v1/comments/b356097c-c6d0-4a3d-85f6-33bc2595c984')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(status.notfound);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Comment not found');
            done(err);
          });
      });
  });
  
  it('fakes server error when deleting an comment', async () => {
    const req = {
      params: {
        commentId: '777f640e-a2ff-45ee-9ce1-bf37645c42d6'
      }
    };
    const res = {
      status: () => { },
      json: () => { },
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Comments, 'destroy').throws();

    await CommentsController.deleteCommentById(req, res);
    expect(res.status).to.have.been.calledWith(status.error);
  });
});

// GET all comment Testing
describe('/GET All request comment', () => {
  it('it should return a response when request is not found', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(server)
          .get('/api/v1/requests/777f640e-a2ff-45ee-9ce1-bf37645c42d8/comments')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(status.notfound);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Request not found');
            done(err);
          });
      });
  });

  it('Should return comments', (done) => {
    chai
      .request(server)
      .post(signinRoute)
      .send(user)
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(server)
          .get('/api/v1/requests/2b770fbc-76e6-4b5a-afab-882759fd1f06/comments')
          .set('Authorization', token)
          .end((err, res) => {
            res.should.have.status(status.success);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Comments retrieved successfully');
            res.body.should.have.property('data');
            done(err);
          });
      });
  });

  it('fakes server when retreiving all comments', async () => {
    const req = {
      params: {
        requestId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
      }
    };
    const res = {
      status: () => { },
      json: () => { },
    };
    sinon.stub(res, 'status').returnsThis();
    sinon.stub(models.Comments, 'findAll').throws();

    await CommentsController.getAllCommentsOnRequest(req, res);
    expect(res.status).to.have.been.calledWith(status.error);
  });
});