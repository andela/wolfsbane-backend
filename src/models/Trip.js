export default (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trips', {
    origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    departureDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    travelReasons: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeOfTrip: {
      type: DataTypes.ENUM('One Way', 'Return', 'Multi-City'),
      allowNull: false
    },
    accommodationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Accommodations',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    requestId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Requests',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  });
  return Trip;
};
