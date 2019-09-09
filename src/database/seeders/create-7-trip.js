export default {
    up: queryInterface => queryInterface.bulkInsert(
      'Trips',
      [
        {
            id: '6c879efc-7629-4b2b-a855-5f9d1c170763',
            requestId: '47db7b6c-394f-452b-a09d-19bff77f84d9',
            origin: 'lagos',
            destination: 'Nairobi',
            departureDate: '2019-09-09T01:33:28.862Z',
            returnDate: '2019-09-09T01:33:28.862Z',
            travelReasons: 'The dev conference organized by google.',
            typeOfTrip: 'Return',
            roomId: 'b098fb80-72c7-4a9a-a35a-634692384d89',
            accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06',
          },
          {
            id: '18a6aab7-8813-45f0-bee3-f88168bf4add',
            requestId: 'ee64e4e3-71ac-4ded-a504-f8f54fb0dc12',
            origin: 'lagos',
            destination: 'Nairobi',
            departureDate: '2019-09-09T01:33:28.862Z',
            returnDate: '2019-09-09T01:33:28.862Z',
            travelReasons: 'The dev conference organized by google.',
            typeOfTrip: 'Return',
            roomId: 'b098fb80-72c7-4a9a-a35a-634692384d89',
            accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06',
          },
          {
            id: '17aa9aa1-77eb-4d9d-ac4e-18163a5d6393',
            requestId: 'b5c6e498-aaf9-4018-8a44-3a9e7431c81a',
            origin: 'lagos',
            destination: 'Kampala',
            departureDate: '2019-09-09T01:33:28.862Z',
            travelReasons: 'The dev conference organized by andela.',
            typeOfTrip: 'One Way',
            roomId: 'b098fb80-72c7-4a9a-a35a-634692384d89',
            accommodationId: '2b770fbc-76e6-4b5a-afab-882759fd1f06',
          }
      ],
      {}
    ),
  
    down: queryInterface => queryInterface.bulkDelete('Trips', null, {})
  };
  