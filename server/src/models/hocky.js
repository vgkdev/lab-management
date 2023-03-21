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
        foreignKey: "fk_HocKy_LopHP",
      });
      HocKy.hasMany(models.NhomTH, {
        foreignKey: "fk_HocKy_NhomTH",
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
      tableName: "hocky",
    }
  );
  return HocKy;
};
