'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [queryInterface.addColumn("NumberPatternChallenges", "userId",
      {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
          as: "userId"
        }
      }
    ), queryInterface.addColumn("NumberPatternChallenges", "public",
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })];
  },

  down: (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn("NumberPatternChallenges", "userId"),
      queryInterface.removeColumn("NumberPatternChallenges", "public")];
  }
};
