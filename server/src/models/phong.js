"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Phong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Phong.hasMany(models.QuanLy, {
        foreignKey: "fk_Phong_QuanLy",
      });
      Phong.hasMany(models.SuCo, {
        foreignKey: "fk_Phong_SuCo",
      });
      Phong.hasMany(models.LichTH, {
        foreignKey: "fk_Phong_LichTH",
      });
    }
  }
  Phong.init(
    {
      sttPhong: DataTypes.INTEGER,
      tenPhong: DataTypes.STRING,
      soMay: DataTypes.INTEGER,
      cauHinhMay: DataTypes.STRING,
      ghiChu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Phong",
      tableName: "phong",
    }
  );
  return Phong;
};
