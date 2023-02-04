'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Savdo2s', {
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
      sana: {
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
    await queryInterface.dropTable('Savdo2s');
  }
};