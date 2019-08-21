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
    }
  }, {});
  return Trip;
};
