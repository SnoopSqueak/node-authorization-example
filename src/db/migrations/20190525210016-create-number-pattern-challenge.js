'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NumberPatternChallenges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slots: {
        type: Sequelize.INTEGER
      },
      formula: {
        type: Sequelize.STRING(100)
      },
      blanks: {
        // 20 total slots... 19/2 = ~9
        type: Sequelize.STRING(9)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NumberPatternChallenges');
  }
};
