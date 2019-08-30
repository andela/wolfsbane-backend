const profile = {
  id: 12345,
  displayName: 'Darasimi Olaifa',
  name: {
    familyName: 'Olaifa',
    givenName: 'Darasimi'
  },
  emails: [{ value: 'darasimiolaifa@gmail.com' }],
  photos: ['myImage.jpg']
};
const google = {
  ...profile,
  provider: 'google'
};
const facebook = {
  ...profile,
  provider: 'facebook'
};
const unauthorized = undefined;
const serverError = {
  ...profile,
  emails: [{ email: 'darasimiolaifa@gmail.com' }],
  provider: 'serverError'
};
export default {
  google,
  facebook,
  unauthorized,
  serverError
};
