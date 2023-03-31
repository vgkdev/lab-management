"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DonVi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DonVi.hasMany(models.CanBo, {
        foreignKey: "maDV",
      });
    }
  }
  DonVi.init(
    {
      maDV: DataTypes.STRING,
      tenDV: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DonVi",
      tableName: "donvi",
    }
  );
  return DonVi;
};
