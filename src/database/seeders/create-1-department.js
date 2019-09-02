export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Departments',
    [
      {
        id: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2',
        name: 'Software Engineering'
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Departments', null, {})
};
