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
        type: Sequelize.STRING(20)
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
