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
      {
        id: '6ec04654-da17-4884-a4bb-410c2fb27430',
        userId: '2e2e18b9-8bf8-43c3-b19a-c36477dc47b6',
        departmentId: '36da1ce3-8e1f-4b0f-8e15-1189d8231ef2',
        role: 'Staff',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '1e0192d9-3612-486f-991e-1b694a47a676',
        userId: 'f889348b-abb2-4cda-bec1-04251163ce64',
        departmentId: 'ac99e4b1-b145-403e-aae0-96d7863eaf7d',
        role: 'Manager',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'd8f2f86e-bf0c-4197-bc49-e8f11b091869',
        userId: 'f1daf099-62cf-4851-a600-7d5321f9b5d4',
        departmentId: 'ac99e4b1-b145-403e-aae0-96d7863eaf7d',
        role: 'Staff',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Profiles', null, {})
};
