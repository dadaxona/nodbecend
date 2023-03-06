'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oyliklar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Oyliklar.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    oylikdataId: DataTypes.INTEGER,
    ishchilarId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    sana: DataTypes.STRING,
    koment: DataTypes.STRING,
    summa: DataTypes.STRING,
    valyuta: DataTypes.STRING,
    kurs: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Oyliklar',
  });
  return Oyliklar;
};