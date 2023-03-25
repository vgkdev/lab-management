"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lopHP", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      sttLHP: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      tietBD: {
        type: Sequelize.INTEGER,
      },
      soTiet: {
        type: Sequelize.INTEGER,
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
      hocKy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "HocKy",
          key: "hocKy",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      maHP: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "hocPhan",
          key: "maHP",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      thu: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Thu",
          key: "thu",
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
    await queryInterface.dropTable("lopHP");
  },
};
