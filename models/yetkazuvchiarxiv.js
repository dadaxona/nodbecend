'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Yetkazuvchiarxiv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Yetkazuvchiarxiv.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    yetkazuvchiId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    soni: DataTypes.STRING,
    summa: DataTypes.STRING,
    jami: DataTypes.STRING,
    sana: DataTypes.STRING,
    kurs: DataTypes.STRING,
    valyuta: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Yetkazuvchiarxiv',
  });
  return Yetkazuvchiarxiv;
};