export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('profiles', {
    userId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    departmentId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    role: {
      type: Sequelize.ENUM('Super Admin', 'Travel Admin', 'Manager', 'Staff'),
      defaultValue: 'Staff',
      allowNull: true
    },
    jobDescription: {
      type: Sequelize.STRING,
      allowNull: true
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('profiles')
};
