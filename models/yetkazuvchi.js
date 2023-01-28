'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Yetkazuvchi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Yetkazuvchi.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Yetkazuvchi.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    summa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Yetkazuvchi',
  });
  return Yetkazuvchi;
};