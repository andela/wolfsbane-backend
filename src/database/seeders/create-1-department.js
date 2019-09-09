export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Departments',
    [
      {
        id: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2',
        name: 'Software Engineering'
      },
      {
        id: 'ac99e4b1-b145-403e-aae0-96d7863eaf7d',
        name: 'Finance Department'
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Departments', null, {})
};
