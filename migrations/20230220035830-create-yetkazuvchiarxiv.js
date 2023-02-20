'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Yetkazuvchiarxivs', {
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
      yetkazuvchiId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      soni: {
        type: Sequelize.STRING
      },
      summa: {
        type: Sequelize.STRING
      },
      jami: {
        type: Sequelize.STRING
      },
      sana: {
        type: Sequelize.STRING
      },
      kurs: {
        type: Sequelize.STRING
      },
      valyuta: {
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
    await queryInterface.dropTable('Yetkazuvchiarxivs');
  }
};