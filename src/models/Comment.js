export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comments', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.Users, { as: 'theComment', foreignKey: 'userId' });
  };
  return Comment;
};
