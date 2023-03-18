"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CanBo", {
      // id: {
      //    primaryKey: true,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      maCB: {
        type: Sequelize.STRING,
        primaryKey: true,
        primaryKey: true,
      },
      maDV: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "DonVi",
          key: "maDV",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      hoTen: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("CanBo");
  },
};
