
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
      },
      {
        email: 'adelekegbolahan92@yahoo.com',
        password: 'Anonymous',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        password: 'Unkown',
        email: 'janedoe@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
