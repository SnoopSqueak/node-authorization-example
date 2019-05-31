'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {msg: "must be a valid email"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.NumberPatternChallenge, {
      foreignKey: "userId",
      as: "numberPatternChallenges"
    })
  };

  User.prototype.isAdmin = function () {
    return (this.role === 2);
  };

  return User;
};
