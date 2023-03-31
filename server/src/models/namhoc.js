"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Namhoc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Namhoc.hasMany(models.LopHP, {
        foreignKey: "namHoc",
      });
      Namhoc.hasMany(models.QuanLy, {
        foreignKey: "namHoc",
      });
      Namhoc.hasMany(models.HocKy, {
        foreignKey: "namHoc",
      });
    }
  }
  Namhoc.init(
    {
      namHoc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "NamHoc",
      tableName: "namhoc",
    }
  );
  return Namhoc;
};
