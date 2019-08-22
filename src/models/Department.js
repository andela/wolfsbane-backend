export default (sequelize, DataTypes) => {
  const Department = sequelize.define('departments', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Department.associate = (models) => {
    // associations can be defined here
  };
  return Department;
};
