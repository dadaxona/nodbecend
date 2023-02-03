'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Savdo2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Savdo2.init({
    userId: DataTypes.INTEGER,
    sana: DataTypes.STRING,
    jamisumma: DataTypes.STRING,
    naqt: DataTypes.STRING,
    plastik: DataTypes.STRING,
    bank: DataTypes.STRING,
    valy: DataTypes.STRING,
    valyuta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Savdo2',
  });
  return Savdo2;
};