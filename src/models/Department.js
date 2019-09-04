export default (sequelize, DataTypes) => {
  const Department = sequelize.define('Departments', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  return Department;
};
