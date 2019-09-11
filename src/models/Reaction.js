export default (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    reaction: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {});
  return Reaction;
};