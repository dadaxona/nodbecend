'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sotuvs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      savdoId: {
        type: Sequelize.INTEGER
      },
      tovar: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      soni: {
        type: Sequelize.STRING
      },
      sotilish: {
        type: Sequelize.STRING
      },
      chegrma: {
        type: Sequelize.STRING
      },
      jami: {
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
    await queryInterface.dropTable('Sotuvs');
  }
};