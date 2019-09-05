export default {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
      'Profiles',
      [
        {
          userId: '43d3bdc2-3261-4cf9-8ea4-cf41521c90a1',
          phoneNumber: '66666666666',
          departmentId: '5106cc70-4681-45b6-848f-50b3247cc0ce',
          role: 'Staff',
          jobDescription: 'software developer',
          imageUrl: 'http://www.tco-team.com/blog/become-a-good-developer/',
          isVerified: 'true',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    ),
  
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('profiles', null, {})
  };