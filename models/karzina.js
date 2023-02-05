'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Karzina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Karzina.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    sotivchi: DataTypes.STRING,
    zaqazId: DataTypes.INTEGER,
    tovar: DataTypes.INTEGER,
    name: DataTypes.STRING,
    soni: DataTypes.STRING,
    sotilish: DataTypes.STRING,
    chegrma: DataTypes.STRING,
    jami: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Karzina',
  });
  return Karzina;
};