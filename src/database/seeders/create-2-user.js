import { hashPassword } from '../../utils';
export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: 'e71c28fd-73d8-4d92-9125-ab3d022093b9',
        firstName: '',
        lastName: '',
        email: 'funmi1@gmail.com',
        password: hashPassword('funmi1234'),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'e71c28fd-73d8-4d92-9125-ab3d022093b0',
        email: 'adelekegbolahan92@yahoo.com',
        password: hashPassword('funmi1234'),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '7aa38d4e-7fbf-4067-8821-9c27d2fb6e3a',
        email: 'samailabalap@gmail.com',
        password: hashPassword('funmi1234'),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2e2e18b9-8bf8-43c3-b19a-c36477dc47b6',
        email: 'kelechi@gmail.com',
        password: hashPassword('kelechi'),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'f889348b-abb2-4cda-bec1-04251163ce64',
        email: 'funmiolaiya9@gmail.com',
        password: hashPassword('funmilayo'),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'f1daf099-62cf-4851-a600-7d5321f9b5d4',
        email: 'ayooyewo@gmail.com',
        password: hashPassword('ayo1234'),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '36bc32ea-43e4-40a8-9968-e281981ca0fe',
        email: 'dele@gmail.com',
        password: hashPassword('dele1234'),
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
