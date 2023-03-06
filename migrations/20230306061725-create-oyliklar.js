'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Oyliklars', {
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
      oylikdataId: {
        type: Sequelize.INTEGER
      },
      ishchilarId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      sana: {
        type: Sequelize.STRING
      },
      koment: {
        type: Sequelize.STRING
      },
      summa: {
        type: Sequelize.STRING
      },
      valyuta: {
        type: Sequelize.STRING
      },
      kurs: {
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
    await queryInterface.dropTable('Oyliklars');
  }
};