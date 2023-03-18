"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HocPhan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HocPhan.hasMany(models.LopHP, {
        foreignKey: "maHP",
      });
      HocPhan.hasMany(models.NhomTH, {
        foreignKey: "maHP",
      });
    }
  }
  HocPhan.init(
    {
      maHP: DataTypes.STRING,
      tenNHP: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HocPhan",
    }
  );
  return HocPhan;
};
