"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NhomTH extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NhomTH.belongsTo(models.LopHP, {
        foreignKey: "sttLHP",
      });
      NhomTH.hasMany(models.LichTH, {
        foreignKey: "idNhom",
      });
      NhomTH.belongsTo(models.Phong, {
        foreignKey: "sttPhong",
      });
    }
  }
  NhomTH.init(
    {
      idNhom: DataTypes.INTEGER,
      soLuong: DataTypes.INTEGER,
      yeuCauPhanMem: DataTypes.STRING,
      sttLHP: DataTypes.INTEGER,
      tuan: DataTypes.INTEGER,
      sttPhong: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "NhomTH",
      tableName: "nhomth",
    }
  );
  return NhomTH;
};
