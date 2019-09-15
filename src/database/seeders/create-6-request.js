export default {
    up: queryInterface => queryInterface.bulkInsert(
      'Requests',
      [
        {
          id: '2b770fbc-76e6-4b5a-afab-882759fd1f06',
          status: 'pending',
          accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06',
          userId: 'e71c28fd-73d8-4d92-9125-ab3d022093b9'
        },
        {
          id: 'b356097c-c6d0-4a3d-85f6-33bc2595c974',
          status: 'rejected',
          accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06',
          userId: 'e71c28fd-73d8-4d92-9125-ab3d022093b0'
        },
        {
          id: '777f640e-a2ff-45ee-9ce1-bf37645c42d6',
          status: 'approved',
          accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06',
          userId: '7aa38d4e-7fbf-4067-8821-9c27d2fb6e3a'
        },
      ],
      {}
    ),
  
    down: queryInterface => queryInterface.bulkDelete('Requests', null, {})
  };
  