export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profiles', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      unique: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
    Profile.belongsTo(models.Users, { as: 'theUser', foreignKey: 'userId' });
  };
  return Profile;
};
