export default (sequelize, DataTypes) => {
  const Request = sequelize.define(
    'Requests',
    {
      status: {
        type: DataTypes.ENUM('pending', 'rejected', 'approved'),
        allowNull: false,
        defaultValue: 'pending'
      },
      departmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Departments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      lineManagerMail: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Request.associate = (models) => {
    Request.hasMany(models.Comments, { as: 'requestComments', foreignKey: 'requestId' });
    Request.hasMany(models.Trips, {
      as: 'requestTrips',
      foreignKey: 'requestId',
      onDelete: 'cascade',
      hooks: true
    });
  };
  return Request;
};
