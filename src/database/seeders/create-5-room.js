export default {
  up: queryInterface => queryInterface.bulkInsert(
    'Rooms',
    [
      {
        id: 'dc9fff35-7a69-43a2-8056-7a1ee99dcbf9',
        type: 'Executive Suite',
        capacity: 4,
        accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
      },
      {
        id: '5402e279-9447-4ac6-98c8-44cf10e27f4e',
        type: 'Single Suite',
        capacity: 2,
        accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
      },
      {
        id: 'b098fb80-72c7-4a9a-a35a-634692384d89',
        type: 'Double Suite',
        capacity: 4,
        accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06'
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Rooms', null, {})
};
