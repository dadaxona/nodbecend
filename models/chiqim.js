'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chiqim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chiqim.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    sotivchi: DataTypes.STRING,
    qayerga: DataTypes.STRING,
    sabap: DataTypes.STRING,
    summa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chiqim',
  });
  return Chiqim;
};