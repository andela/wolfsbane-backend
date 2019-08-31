export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Departments',
    [
      {
        name: 'Software Engineering'
      },
      {
        name: 'Accounting'
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Departments', null, {})
};
