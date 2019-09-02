import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import MockStrategy from './mockStrategy';
import config from './index';
import { strategyCallback, getCallbackUrls } from '../utils';

const {
  testEnvironment, googleCallbackUrl, facebookCallbackUrl
} = getCallbackUrls;

// If test environment, use mocked user and mocked strategy
if (testEnvironment) {
  passport.use(new MockStrategy('google', strategyCallback));
  passport.use(new MockStrategy('facebook', strategyCallback));
} else { // use actual strategy of social platforms
  passport.use(new GoogleStrategy({
    clientID: config.oauth.google.clientID,
    clientSecret: config.oauth.google.clientSecret,
    callbackURL: googleCallbackUrl,
  }, strategyCallback));

  passport.use(new FacebookStrategy({
    clientID: config.oauth.facebook.clientID,
    clientSecret: config.oauth.facebook.clientSecret,
    callbackURL: facebookCallbackUrl,
    profileFields: ['email', 'name']
  }, strategyCallback));
}
