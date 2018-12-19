module.exports = function(sequelize, DataTypes) {
  var reviews = sequelize.define("reviews", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kavaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });


  reviews.associate = function(models) {
    reviews.belongsTo(models.kavas, {foreignKey:"kavaId"});
    reviews.belongsTo(models.users, {foreignKey:"userId"});
  };

  return reviews;
};
