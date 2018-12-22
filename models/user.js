module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define("users", {
        username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      last_login: {
        type: DataTypes.DATE
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    });


    users.associate = function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        users.hasMany(models.reviews, {foreignKey:"userId"});
      };

    return users;
  };
  

