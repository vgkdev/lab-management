"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("NhomTH", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      idNhom: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      soLuong: {
        type: Sequelize.INTEGER,
      },
      yeuCauPhanMem: {
        type: Sequelize.STRING,
      },
      maCB: {
        type: Sequelize.STRING,
        references: {
          model: "CanBo",
          key: "maCB",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      namHoc: {
        type: Sequelize.INTEGER,
        references: {
          model: "NamHoc",
          key: "namHoc",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      maHP: {
        type: Sequelize.STRING,
        references: {
          model: "HocPhan",
          key: "maHP",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      hocKy: {
        type: Sequelize.INTEGER,
        references: {
          model: "HocKy",
          key: "hocKy",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      sttLHP: {
        type: Sequelize.INTEGER,
        references: {
          model: "LopHP",
          key: "sttLHP",
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
    await queryInterface.dropTable("NhomTH");
  },
};
