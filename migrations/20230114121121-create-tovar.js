'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tovars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      tip: {
        type: Sequelize.STRING
      },
      adress: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      ogoh: {
        type: Sequelize.INTEGER
      },
      soni: {
        type: Sequelize.INTEGER
      },
      olinish: {
        type: Sequelize.STRING
      },
      sotilish: {
        type: Sequelize.STRING
      },
      sotilish2: {
        type: Sequelize.STRING
      },
      valyuta: {
        type: Sequelize.STRING
      },
      summa: {
        type: Sequelize.STRING
      },
      kod: {
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
    await queryInterface.dropTable('Tovars');
  }
};