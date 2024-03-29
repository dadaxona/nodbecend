'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Zadachadbs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      magazinId: {
        type: Sequelize.INTEGER
      },
      magazin: {
        type: Sequelize.STRING
      },
      ishchilarId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      sana: {
        type: Sequelize.STRING
      },
      zadacha: {
        type: Sequelize.TEXT
      },
      stasus: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Zadachadbs');
  }
};