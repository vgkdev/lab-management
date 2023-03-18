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
        foreignKey: "maCB",
      });
      CanBo.hasMany(models.QuanLy, {
        foreignKey: "maCB",
      });
      CanBo.hasMany(models.SuCo, {
        foreignKey: "maCB",
      });
      CanBo.hasMany(models.NhomTH, {
        foreignKey: "maCB",
      });
    }
  }
  CanBo.init(
    {
      maCB: DataTypes.STRING,
      maDV: DataTypes.STRING,
      hoTen: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CanBo",
    }
  );
  return CanBo;
};
