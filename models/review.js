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
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    

    reviews.belongsTo(models.kavas, {foreignKey:"kavaId"});
    reviews.belongsTo(models.users, {foreignKey:"userId"});
  };


  // reviews.associate = function(models) {
  //   // We're saying that a Post should belong to an Author
  //   // A Post can't be created without an Author due to the foreign key constraint
  //   reviews.belongsTo(models.kava, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return reviews;
};
