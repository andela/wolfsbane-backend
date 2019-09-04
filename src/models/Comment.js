export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comments', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  return Comment;
};
