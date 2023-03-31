"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QuanLy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuanLy.belongsTo(models.Phong, {
        foreignKey: "sttPhong",
      });
      QuanLy.belongsTo(models.NamHoc, {
        foreignKey: "namHoc",
      });
      QuanLy.belongsTo(models.CanBo, {
        foreignKey: "maCB",
      });
    }
  }
  QuanLy.init(
    {
      sttPhong: DataTypes.INTEGER,
      namHoc: DataTypes.STRING,
      maCB: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "QuanLy",
      tableName: "quanly",
    }
  );
  return QuanLy;
};
