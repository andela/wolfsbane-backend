export default {
  up: queryInterface => queryInterface.bulkInsert(
    'users',
    [
      {
        firstName: '',
        lastName: '',
        email: 'funmi1@gmail.com',
        password: 'funmi',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {})
};
