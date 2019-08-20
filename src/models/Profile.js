export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('profiles', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
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
        model: 'departments',
        key: 'id',
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
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
  });
  Profile.associate = (models) => {
    Profile.belongsTo(models.Department, { as: 'theDepartment', foreignKey: 'departmentId' });
  };
  return Profile;
};
