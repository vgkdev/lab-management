"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SuCo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SuCo.belongsTo(models.Phong);
      SuCo.belongsTo(models.CanBo);
    }
  }
  SuCo.init(
    {
      sttSuCo: DataTypes.INTEGER,
      noiDungPhanAnh: DataTypes.STRING,
      trangThai: DataTypes.STRING,
      noiDungKhacPhuc: DataTypes.STRING,
      ghiChuKhac: DataTypes.STRING,
      ngayPhanAnh: DataTypes.DATE,
      ngayKhacPhuc: DataTypes.DATE,
      sttPhong: DataTypes.INTEGER,
      maCB: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SuCo",
      tableName: "suco",
    }
  );
  return SuCo;
};
