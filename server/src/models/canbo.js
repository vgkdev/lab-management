"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CanBo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CanBo.belongsTo(models.DonVi);

      CanBo.hasMany(models.LopHP, {
        foreignKey: "fk_CanBo_LopHP",
      });
      CanBo.hasMany(models.QuanLy, {
        foreignKey: "fk_CanBo_QuanLy",
      });
      CanBo.hasMany(models.SuCo, {
        foreignKey: "fk_CanBo_SuCo",
      });
      CanBo.hasMany(models.NhomTH, {
        foreignKey: "fk_CanBo_NhomTH",
      });
    }
  }
  CanBo.init(
    {
      maCB: DataTypes.STRING,
      maDV: DataTypes.STRING,
      hoTen: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      SDT: DataTypes.STRING,
      diaChi: DataTypes.STRING,
      chucVu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CanBo",
      tableName: "canbo",
      id: false,
      autoIncrement: false,
      primaryKey: false,

      // freezeTableName: true,
      // id: false,
    }
  );
  return CanBo;
};
