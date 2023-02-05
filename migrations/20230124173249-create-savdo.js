'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Savdos', {
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
      sotivchi: {
        type: Sequelize.STRING
      },
      mijozId: {
        type: Sequelize.INTEGER
      },
      mijoz: {
        type: Sequelize.STRING
      },
      jamisumma: {
        type: Sequelize.STRING
      },
      naqt: {
        type: Sequelize.STRING
      },
      plastik: {
        type: Sequelize.STRING
      },
      bank: {
        type: Sequelize.STRING
      },
      karz: {
        type: Sequelize.STRING
      },
      srok: {
        type: Sequelize.STRING
      },
      valy: {
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
    await queryInterface.dropTable('Savdos');
  }
};