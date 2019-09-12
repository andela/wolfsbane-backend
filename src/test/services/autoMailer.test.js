import chai from 'chai';
import sinon from 'sinon';
import sgMail from '@sendgrid/mail';
import * as services from '../../services/index';
import fakeData from '../fakeData/fakeData';

chai.should();

const {
  token, data
} = fakeData;
const { email } = fakeData;
const url = `https://barefootnomad.herokuapp.com/confirmAccount/${token}`;
data.url = url;
const { sendEmail } = services;

describe('Send Email Test', () => {
  afterEach(() => sinon.restore);
  it('Should send Account verification mail successfuly', async () => {
    const response = [{ request: true }];
    sinon.stub(sgMail, 'send').returns(response);
    const result = await sendEmail(email, 'confirmAccount', data);
    result.success.should.equal(true);
    result.message.should.equal('Email sent successfully');
  });

  it('Should send Password Recovery mail successfuly', async () => {
    const response = [{ request: true }];
    sinon.stub(sgMail, 'send').returns(response);
    const result = await sendEmail(email, 'passwordRecovery', data);
    result.success.should.equal(true);
    result.message.should.equal('Email sent successfully');
  });

  it('Should send Trip Request mail successfuly', async () => {
    const response = [{ request: true }];
    sinon.stub(sgMail, 'send').returns(response);
    const result = await sendEmail(email, 'tripRequest', data);
    result.success.should.equal(true);
    result.message.should.equal('Email sent successfully');
  });

  it('Should send Trip Feedback mail successfuly', async () => {
    const response = [{ request: true }];
    sinon.stub(sgMail, 'send').returns(response);
    const result = await sendEmail(email, 'tripFeedback', data);
    result.success.should.equal(true);
    result.message.should.equal('Email sent successfully');
  });

  it('Should handle email verification mail error', async () => {
    sinon.stub(sgMail, 'send').throws();
    const result = await sendEmail(email, 'tripFeedback', data);
    result.success.should.equal(false);
    result.should.have.property('error');
  });
});
