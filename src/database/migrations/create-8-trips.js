export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Trips', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    origin: {
      type: Sequelize.STRING,
      allowNull: false
    },
    destination: {
      type: Sequelize.STRING,
      allowNull: false
    },
    departureDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    returnDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    travelReasons: {
      type: Sequelize.STRING,
      allowNull: false
    },
    typeOfTrip: {
      type: Sequelize.ENUM('One Way', 'Return', 'Multi-City'),
      allowNull: false
    },
    requestId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Requests',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    accommodationId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Accommodations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    roomId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Rooms',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Date.now()
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Trips')
};
