export default {
  up: queryInterface => queryInterface.bulkInsert(
    'departments',
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

  down: queryInterface => queryInterface.bulkDelete('departments', null, {})
};
