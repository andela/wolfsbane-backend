export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'users',
    [
      {
        firstName: '',
        lastName: '',
        email: 'funmi1@gmail.com',
        password: 'funmi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
