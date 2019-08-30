import { config } from 'dotenv';

config();

export default {
  secret:
    process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
  oauth: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }
  },
  password: process.env.PASSWORD,
};
