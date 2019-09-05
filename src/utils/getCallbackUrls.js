import { config } from 'dotenv';

config();
const environment = process.env.NODE_ENV;
const testEnvironment = !(environment === 'development' || environment === 'staging' || environment === 'production');
const productionEnvironment = process.env.NODE_ENV === 'production';
const stagingEnvironment = process.env.NODE_ENV === 'staging';
let baseUrl;

if (productionEnvironment) baseUrl = 'barefootnomad.herokuapp.com/api/v1/auth';
else if (stagingEnvironment) baseUrl = 'barefootnomad-staging.herokuapp.com/api/v1/auth';
else baseUrl = 'http://localhost:3000/api/v1/auth';

const googleCallbackUrl = `${baseUrl}/google/callback`;
const facebookCallbackUrl = `${baseUrl}/facebook/callback`;

export default {
  baseUrl,
  testEnvironment,
  googleCallbackUrl,
  facebookCallbackUrl
};
