export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Profiles',
    [
      {
        id: '7bfd92e6-ac4c-46ee-acc3-14fd70d9c030',
        userId: 'e71c28fd-73d8-4d92-9125-ab3d022093b9',
        departmentId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2',
        role: 'Super Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '7bfd92e6-ac4c-46ee-acc3-14fd70d9c032',
        userId: 'e71c28fd-73d8-4d92-9125-ab3d022093b0',
        departmentId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2',
        role: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'cff5035d-c806-4b71-90e7-969db7a8c186',
        userId: '7aa38d4e-7fbf-4067-8821-9c27d2fb6e3a',
        departmentId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2',
        role: 'Super Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Profiles', null, {})
};
