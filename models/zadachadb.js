'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zadachadb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Zadachadb.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    ishchilarId: DataTypes.STRING,
    name: DataTypes.STRING,
    sana: DataTypes.STRING,
    zadacha: DataTypes.TEXT,
    stasus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Zadachadb',
  });
  return Zadachadb;
};