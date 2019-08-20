export default (sequelize, DataTypes) => {
  const Department = sequelize.define('departments', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  return Department;
};
