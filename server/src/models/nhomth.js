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
      NhomTH.belongsTo(models.CanBo);
      NhomTH.belongsTo(models.NamHoc);
      NhomTH.belongsTo(models.HocPhan);
      NhomTH.belongsTo(models.HocKy);
      NhomTH.belongsTo(models.LopHP);
      NhomTH.hasMany(models.LichTH, {
        foreignKey: "idNhom",
      });
    }
  }
  NhomTH.init(
    {
      idNhom: DataTypes.INTEGER,
      soLuong: DataTypes.INTEGER,
      yeuCauPhanMem: DataTypes.STRING,
      maCB: DataTypes.STRING,
      namHoc: DataTypes.INTEGER,
      maHP: DataTypes.STRING,
      hocKy: DataTypes.INTEGER,
      sttLHP: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "NhomTH",
    }
  );
  return NhomTH;
};
