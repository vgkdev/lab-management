"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Thu.hasMany(models.LopHP, {
        foreignKey: "thu",
      });

      Thu.hasMany(models.LichTH, {
        foreignKey: "thu",
      });
    }
  }
  Thu.init(
    {
      thu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Thu",
      tableName: "thu",
    }
  );
  return Thu;
};
