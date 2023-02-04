'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ishchilars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      fam: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING
      },
      magazinId: {
        type: Sequelize.INTEGER
      },
      magazin: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      valyuta: {
        type: Sequelize.STRING
      },
      tip: {
        type: Sequelize.STRING
      },
      yetkazu: {
        type: Sequelize.STRING
      },
      mijoz: {
        type: Sequelize.STRING
      },
      sqlad: {
        type: Sequelize.STRING
      },
      chiqim: {
        type: Sequelize.STRING
      },
      foyda: {
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
    await queryInterface.dropTable('Ishchilars');
  }
};