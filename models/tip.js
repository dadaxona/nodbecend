'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tip.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      // Tip.hasOne(models.Tovar, {
      //   foreignKey: 'tipId',
      // });
    }
  }
  Tip.init({
    userId: DataTypes.INTEGER,
    magazinId: DataTypes.INTEGER,
    magazin: DataTypes.STRING,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tip',
  });
  return Tip;
};