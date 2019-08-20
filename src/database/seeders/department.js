
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'departments',
    [
      {
        name: 'Software Engineering',
      },
      {
        name: 'Accounting',
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('departments', null, {})
};
