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
      LopHP.belongsTo(models.NamHoc);

      // quan hệ với bảng HocKy
      LopHP.belongsTo(models.HocKy);

      // quan hệ với bảng Thu
      LopHP.belongsTo(models.Thu);

      // quan hệ với bảng MCB
      LopHP.belongsTo(models.CanBo);

      // quan hệ với bảng MaHP
      LopHP.belongsTo(models.HocPhan);

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
    }
  );
  return LopHP;
};
