import chai from 'chai';
import sendEmail from '../../services/index';
import fakeData from '../fakeData/fakeData';

chai.should();

const {
  token, data
} = fakeData;
const { email } = fakeData;

let category;
describe('Send Email Test', () => {
  it('Should send Account verification mail successfuly', async function callBack() {
    this.timeout(20000);
    const url = `https://barefootnomad.herokuapp.com/confirmAccount/${token}`;
    data.url = url;
    category = 'confirmAccount';
    const result = await sendEmail(email, category, data);
    result.success.should.equal(true);
    result.message.should.equal('Email sent successfully');
  });

  it('Should send Password Recovery mail successfuly', async function callBack() {
    this.timeout(20000);
    const url = `https://barefootnomad.herokuapp.com/resetPassword/${token}`;
    data.url = url;
    category = 'passwordRecovery';
    const result = await sendEmail(email, category, data);
    result.success.should.equal(true);
    result.message.should.equal('Email sent successfully');
  });

  it('Should send Trip Request mail successfuly', async function callBack() {
    this.timeout(20000);
    const url = `https://barefootnomad.herokuapp.com/tripRequest/${token}`;
    data.url = url;
    category = 'tripRequest';
    const result = await sendEmail(email, category, data);
    result.success.should.equal(true);
    result.message.should.equal('Email sent successfully');
  });

  it('Should send Trip Feedback mail successfuly', async function callBack() {
    this.timeout(20000);
    const url = `https://barefootnomad.herokuapp.com/tripFeedback/${token}`;
    data.url = url;
    category = 'tripFeedback';
    const result = await sendEmail(email, category, data);
    result.success.should.equal(true);
    result.message.should.equal('Email sent successfully');
  });

  // it('Should handle email verification mail error', async function callBack() {
  //   this.timeout(20000);
  //   const url = `https://barefootnomad.herokuapp.com/errorHandling/${token}`;
  //   data.url = url;
  //   email = 111111;
  //   const result = await sendEmail(email, category, data);
  //   result.success.should.equal(false);
  //   result.should.have.property('error');
  // });
});
