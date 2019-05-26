'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("NumberPatternChallenges", "constant",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("NumberPatternChallenges", "constant");
  }
};
