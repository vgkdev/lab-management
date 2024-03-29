"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Buoi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Buoi.hasMany(models.LichTH, {
        foreignKey: "buoi",
      });
    }
  }
  Buoi.init(
    {
      buoi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Buoi",
      tableName: "buoi",
    }
  );
  return Buoi;
};
