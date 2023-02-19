'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Magazin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Magazin.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    telegram: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Magazin',
  });
  return Magazin;
};