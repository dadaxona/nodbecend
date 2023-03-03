'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jonatma extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jonatma.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    tip: DataTypes.STRING,
    adress: DataTypes.STRING,
    name: DataTypes.STRING,
    ogoh: DataTypes.INTEGER,
    soni: DataTypes.INTEGER,
    olinish: DataTypes.STRING,
    sotilish: DataTypes.STRING,
    sotilish2: DataTypes.STRING,
    valyuta: DataTypes.STRING,
    summa: DataTypes.STRING,
    kod: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Jonatma',
  });
  return Jonatma;
};