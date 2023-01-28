'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Savdo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Savdo.init({
    userId: DataTypes.INTEGER,
    mijozId: DataTypes.INTEGER,
    mijoz: DataTypes.STRING,
    jamisumma: DataTypes.STRING,
    naqt: DataTypes.STRING,
    plastik: DataTypes.STRING,
    bank: DataTypes.STRING,
    karz: DataTypes.STRING,
    srok: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Savdo',
  });
  return Savdo;
};