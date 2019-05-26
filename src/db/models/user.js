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
    role: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.hasMany(models.NumberPatternChallenge, {
      foreignKey: "userId",
      as: "numberPatternChallenges"
    })
  };
  return User;
};
