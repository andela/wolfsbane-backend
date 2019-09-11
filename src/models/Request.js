export default (sequelize, DataTypes) => {
  const Request = sequelize.define('Requests', {
    status: {
      type: DataTypes.ENUM('pending', 'rejected', 'approved'),
      allowNull: false,
      defaultValue: 'pending',
    },
  }, {});
  Request.associate = (models) => {
    Request.hasMany(models.Comments, { as: 'requestComments', foreignKey: 'requestId' });
    Request.hasMany(models.Trips, { as: 'requestTrips', foreignKey: 'requestId' });
  };
  return Request;
};
