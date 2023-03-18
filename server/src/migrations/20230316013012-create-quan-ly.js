"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("QuanLy", {
      idQuanLy: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
      namHoc: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "NamHoc",
          key: "namHoc",
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
    await queryInterface.dropTable("QuanLy");
  },
};
