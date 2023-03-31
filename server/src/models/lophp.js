"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LopHP extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LopHP.belongsTo(models.NamHoc, {
        foreignKey: "namHoc",
      });

      // quan hệ với bảng HocKy
      LopHP.belongsTo(models.HocKy, {
        foreignKey: "hocKy",
      });

      // quan hệ với bảng Thu
      LopHP.belongsTo(models.Thu, {
        foreignKey: "thu",
      });

      // quan hệ với bảng MCB
      LopHP.belongsTo(models.CanBo, {
        foreignKey: "maCB",
      });

      // quan hệ với bảng MaHP
      LopHP.belongsTo(models.HocPhan, {
        foreignKey: "maHP",
      });

      LopHP.hasMany(models.NhomTH, {
        foreignKey: "sttLHP",
      });
    }
  }
  LopHP.init(
    {
      sttLHP: DataTypes.INTEGER,
      tietBD: DataTypes.INTEGER,
      soTiet: DataTypes.INTEGER,
      namHoc: DataTypes.STRING,
      hocKy: DataTypes.INTEGER,
      maHP: DataTypes.STRING,
      thu: DataTypes.STRING,
      maCB: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LopHP",
      tableName: "lophp",
    }
  );
  return LopHP;
};
