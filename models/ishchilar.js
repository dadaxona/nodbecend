'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ishchilar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ishchilar.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    fam: DataTypes.STRING,
    tel: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    status: DataTypes.STRING,
    typ: DataTypes.STRING,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    valyuta: DataTypes.STRING,
    tip: DataTypes.STRING,
    yetkazu: DataTypes.STRING,
    mijoz: DataTypes.STRING,
    sqlad: DataTypes.STRING,
    chiqim: DataTypes.STRING,
    foyda: DataTypes.STRING,
    oylik: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Ishchilar',
  });
  return Ishchilar;
};