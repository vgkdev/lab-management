"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tuan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tuan.hasMany(models.LichTH, {
        foreignKey: "soTuan",
      });
    }
  }
  Tuan.init(
    {
      soTuan: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tuan",
      tableName: "tuan",
    }
  );
  return Tuan;
};
