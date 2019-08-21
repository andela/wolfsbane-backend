export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
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

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
