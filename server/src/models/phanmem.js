'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhanMem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PhanMem.init({
    sttPM: DataTypes.INTEGER,
    tenPM: DataTypes.STRING,
    phienBan: DataTypes.STRING,
    ghiChu: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PhanMem',
  });
  return PhanMem;
};