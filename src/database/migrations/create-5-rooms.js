export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Rooms', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true
    },
    accommodationId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Accommodations',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Date.now()
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Date.now()
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Rooms')
};
