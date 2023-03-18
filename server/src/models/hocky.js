"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HocKy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HocKy.hasMany(models.LopHP, {
        foreignKey: "hocKy",
      });
      HocKy.hasMany(models.NhomTH, {
        foreignKey: "hocKy",
      });
    }
  }
  HocKy.init(
    {
      hocKy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HocKy",
    }
  );
  return HocKy;
};
