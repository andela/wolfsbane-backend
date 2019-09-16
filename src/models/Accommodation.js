export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodations', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {});
  Accommodation.associate = (models) => {
    Accommodation.hasMany(models.Rooms, { as: 'roomAccommodation', foreignKey: 'accommodationId', onDelete: 'cascade', hooks: true });
Accommodation.hasMany(models.Trips, { as: 'tripAccommodation', foreignKey: 'accommodationId', onDelete: 'cascade', hooks: true });
    Accommodation.hasMany(models.Reaction, { as: 'accommodationReaction', foreignKey: 'accommodationId', onDelete: 'cascade', hooks: true });
  };
  return Accommodation;
};
