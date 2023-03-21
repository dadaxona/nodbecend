'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Zaqaz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Zaqaz.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    sotivchi: DataTypes.STRING,
    name: DataTypes.STRING,
    valyutaId: DataTypes.STRING,    
    valyuta: DataTypes.STRING,
    kurs: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Zaqaz',
  });
  return Zaqaz;
};