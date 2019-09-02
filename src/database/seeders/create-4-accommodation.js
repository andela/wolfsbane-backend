export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Accommodations',
    [
      {
        id: '2b770fbc-76e6-4b5a-afab-882759fd1f06',
        name: 'Eko Hotels',
        address: 'Lagos'
      },
      {
        id: 'b356097c-c6d0-4a3d-85f6-33bc2595c974',
        name: 'Presidential Hotels',
        address: 'Port Harcourt',
        image: 'something'
      },
      {
        id: '777f640e-a2ff-45ee-9ce1-bf37645c42d6',
        name: 'Barefoot',
        address: 'Port Harcourt',
        image: 'something'
      },
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Accommodations', null, {})
};
