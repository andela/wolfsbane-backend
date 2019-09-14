export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Profiles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    userId: {
      type: Sequelize.DataTypes.UUID,
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
      type: Sequelize.STRING,
      allowNull: true
    },
    departmentId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    role: {
      type: Sequelize.ENUM('Super Admin', 'Travel Admin', 'Manager', 'Staff'),
      defaultValue: 'Staff',
    },
    jobDescription: {
      type: Sequelize.STRING,
      allowNull: true
    },
    imageUrl: {
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('Profiles')
};
