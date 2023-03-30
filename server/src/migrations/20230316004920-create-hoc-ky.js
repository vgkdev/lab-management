"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("HocKy", {
      hocKy: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      namHoc: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "NamHoc",
          key: "namHoc",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      soTuan: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("HocKy");
  },
};
