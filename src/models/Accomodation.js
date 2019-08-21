export default (sequelize, DataTypes) => {
  const Accomodation = sequelize.define('Accomodations', {
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
  Accomodation.associate = (models) => {
    Accomodation.hasMany(models.Rooms, { as: 'roomAccomodation', foreignKey: 'accomodationId' });
    Accomodation.hasMany(models.Requests, { as: 'requestAccomodation', foreignKey: 'accomodationId' });
  };
  return Accomodation;
};
