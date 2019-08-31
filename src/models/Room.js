export default (sequelize, DataTypes) => {
  const Room = sequelize.define('Rooms', {
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  return Room;
};
