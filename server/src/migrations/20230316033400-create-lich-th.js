"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("LichTH", {
      idLichTH: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gioBD: {
        type: Sequelize.DATE,
      },
      gioKT: {
        type: Sequelize.DATE,
      },
      buoi: {
        type: Sequelize.STRING,
        references: {
          model: "Buoi",
          key: "buoi",
        },
      },
      thu: {
        type: Sequelize.STRING,
        references: {
          model: "Thu",
          key: "thu",
        },
      },
      tuan: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tuan",
          key: "tuan",
        },
      },
      idNhom: {
        type: Sequelize.INTEGER,
        references: {
          model: "NhomTH",
          key: "idNhom",
        },
      },
      sttphong: {
        type: Sequelize.INTEGER,
        references: {
          model: "Phong",
          key: "sttPhong",
        },
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
    await queryInterface.dropTable("LichTH");
  },
};
