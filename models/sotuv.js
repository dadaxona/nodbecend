'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sotuv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sotuv.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    sotivchi: DataTypes.STRING,
    savdoId: DataTypes.INTEGER,
    savdo2Id: DataTypes.INTEGER,
    tovar: DataTypes.INTEGER,
    name: DataTypes.STRING,
    olinish: DataTypes.STRING,
    soni: DataTypes.STRING,
    sotilish: DataTypes.STRING,
    chegrma: DataTypes.STRING,
    jami: DataTypes.STRING,
    valy: DataTypes.STRING,
    valyuta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sotuv',
  });
  return Sotuv;
};