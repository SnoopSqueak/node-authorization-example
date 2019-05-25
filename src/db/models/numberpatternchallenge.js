'use strict';
module.exports = (sequelize, DataTypes) => {
  var NumberPatternChallenge = sequelize.define('NumberPatternChallenge', {
    slots: DataTypes.INTEGER,
    formula: DataTypes.STRING(100),
    blanks: DataTypes.STRING(9)
  }, {});
  NumberPatternChallenge.associate = function(models) {
    // associations can be defined here
  };
  return NumberPatternChallenge;
};
