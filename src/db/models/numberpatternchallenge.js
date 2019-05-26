'use strict';
module.exports = (sequelize, DataTypes) => {
  var NumberPatternChallenge = sequelize.define('NumberPatternChallenge', {
    slots: DataTypes.INTEGER,
    formula: DataTypes.STRING(100),
    blanks: DataTypes.STRING(9),
    constant: DataTypes.INTEGER
  }, {});
  NumberPatternChallenge.associate = function(models) {
    NumberPatternChallenge.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    })
  };
  return NumberPatternChallenge;
};
