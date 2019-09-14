import { config } from 'dotenv';

config();
const environment = process.env.NODE_ENV;
const testEnvironment = !(environment === 'development' || environment === 'staging' || environment === 'production');
const productionEnvironment = (environment === 'production') || (environment === 'staging');
let baseUrl;

if (productionEnvironment) baseUrl = 'https://barefootnomad10-staging.herokuapp.com/api/v1';
else baseUrl = 'http://localhost:3000/api/v1';

const googleCallbackUrl = `${baseUrl}/auth/google/callback`;
const facebookCallbackUrl = `${baseUrl}/auth/facebook/callback`;

export default {
  baseUrl,
  testEnvironment,
  googleCallbackUrl,
  facebookCallbackUrl
};
