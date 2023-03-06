'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oylikdata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Oylikdata.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    ishchilarId: DataTypes.INTEGER,
    sana: DataTypes.STRING,
    jami: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Oylikdata',
  });
  return Oylikdata;
};