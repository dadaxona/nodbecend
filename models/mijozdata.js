'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mijozdata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mijozdata.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    mijozId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    summa: DataTypes.STRING,
    kurs: DataTypes.STRING,
    valyuta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mijozdata',
  });
  return Mijozdata;
};