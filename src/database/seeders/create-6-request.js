export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Requests',
    [
      {
        status: 'pending',
        id: '47db7b6c-394f-452b-a09d-19bff77f84d9',
        userId: 'e71c28fd-73d8-4d92-9125-ab3d022093b9',
        departmentId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2',
        lineManagerMail: 'kenneth9@gmail.com',
      },
      {
        status: 'approved',
        id: 'ee64e4e3-71ac-4ded-a504-f8f54fb0dc12',
        userId: '7aa38d4e-7fbf-4067-8821-9c27d2fb6e3a',
        departmentId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2',
        lineManagerMail: 'kenneth9@gmail.com',
      },
      {
        status: 'pending',
        id: 'b5c6e498-aaf9-4018-8a44-3a9e7431c81a',
        userId: 'e71c28fd-73d8-4d92-9125-ab3d022093b0',
        departmentId: 'ac99e4b1-b145-403e-aae0-96d7863eaf7d',
        lineManagerMail: 'chidimmaokoro@gmail.com',
      },
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Requests', null, {})
};
