'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mijoz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mijoz.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Mijoz.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    firma: DataTypes.STRING,
    tel: DataTypes.STRING,
    telegram: DataTypes.STRING,
    karz: DataTypes.STRING,
    summa: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Mijoz',
  });
  return Mijoz;
};