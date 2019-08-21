export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profiles', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    departmentId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    role: {
      type: DataTypes.ENUM('Super Admin', 'Travel Admin', 'Manager', 'Staff'),
      defaultValue: 'Staff',
      allowNull: true
    },
    jobDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });
  Profile.associate = (models) => {
    Profile.belongsTo(models.Departments, { as: 'theDepartment', foreignKey: 'departmentId' });
  };
  return Profile;
};
