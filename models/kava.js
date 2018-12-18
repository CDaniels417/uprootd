module.exports = function(sequelize, DataTypes) {
  var kavas = sequelize.define("kavas", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
  });

  kavas.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    kavas.hasMany(models.reviews, {foreignKey:"kavaId"});
  };

  return kavas;
};

