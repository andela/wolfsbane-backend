import chai from 'chai';
import { emailTemplatesFunction } from '../../utils/index';
import fakeData from '../fakeData/fakeData';

chai.should();

const { data } = fakeData;


describe('Email Templates Test', () => {
  it('Should retrieve Confirm Email template successfully', (done) => {
    const category = 'confirmAccount';
    const result = emailTemplatesFunction(category, data);
    result.should.have.property('subject').equal('Confirm your Email Account');
    result.should.have.property('html').to.be.a('string');
    done();
  });

  it('Should retrieve Password Recovery template successfully', (done) => {
    const category = 'passwordRecovery';
    const result = emailTemplatesFunction(category, data);
    result.should.have.property('subject').equal('Recover your password');
    result.should.have.property('html').to.be.a('string');
    done();
  });

  it('Should retrieve Trip Request template successfully', (done) => {
    const category = 'tripRequest';
    const result = emailTemplatesFunction(category, data);
    result.should.have.property('subject').equal('New Trip Request');
    result.should.have.property('html').to.be.a('string');
    done();
  });

  it('Should retrieve Trip Request template successfully', (done) => {
    const category = 'tripFeedback';
    const result = emailTemplatesFunction(category, data);
    result.should.have.property('subject').equal('Feedback for your trip request');
    result.should.have.property('html').to.be.a('string');
    done();
  });
});
