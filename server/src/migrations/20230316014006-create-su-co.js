"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SuCo", {
      sttSuCo: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      noiDungPhanAnh: {
        type: Sequelize.STRING,
      },
      trangThai: {
        type: Sequelize.STRING,
      },
      noiDungKhacPhuc: {
        type: Sequelize.STRING,
      },
      ghiChuKhac: {
        type: Sequelize.STRING,
      },
      ngayPhanAnh: {
        type: Sequelize.DATEONLY,
        get() {
          const rawValue = this.getDataValue("ngayPhanAnh");
          if (rawValue === null) {
            return null;
          }
          // Format the date as dd/mm/yy
          const formattedDate = new Date(rawValue).toLocaleDateString("en-GB");
          return formattedDate;
        },
        set(value) {
          // Parse the date from dd/mm/yy to a Date object
          const parsedDate = value ? new Date(value) : null;
          this.setDataValue("ngayPhanAnh", parsedDate);
        },
      },
      ngayKhacPhuc: {
        type: Sequelize.DATEONLY,
        get() {
          const rawValue = this.getDataValue("ngayKhacPhuc");
          if (rawValue === null) {
            return null;
          }
          // Format the date as dd/mm/yy
          const formattedDate = new Date(rawValue).toLocaleDateString("en-GB");
          return formattedDate;
        },
        set(value) {
          // Parse the date from dd/mm/yy to a Date object
          const parsedDate = value ? new Date(value) : null;
          this.setDataValue("ngayKhacPhuc", parsedDate);
        },
      },
      sttPhong: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Phong",
          key: "sttPhong",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      maCB: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "CanBo",
          key: "maCB",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SuCo");
  },
};
