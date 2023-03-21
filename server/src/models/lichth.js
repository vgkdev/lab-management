"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LichTH extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LichTH.belongsTo(models.Buoi);
      LichTH.belongsTo(models.Thu);
      LichTH.belongsTo(models.Tuan);
      LichTH.belongsTo(models.NhomTH);
      LichTH.belongsTo(models.Phong);
    }
  }
  LichTH.init(
    {
      gioBD: DataTypes.DATE,
      gioKT: DataTypes.DATE,
      buoi: DataTypes.INTEGER,
      thu: DataTypes.STRING,
      tuan: DataTypes.STRING,
      idNhom: DataTypes.INTEGER,
      sttPhong: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LichTH",
      tableName: "lichth",
    }
  );
  return LichTH;
};
