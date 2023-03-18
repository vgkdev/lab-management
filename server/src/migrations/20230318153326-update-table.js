"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("SuCo", "newColumn", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("SuCo", "ngayPhanAnh", {
      type: Sequelize.DATEONLY,
      allowNull: true,
      set: function (value) {
        if (value instanceof Date) {
          this.setDataValue("ngayPhanAnh", value.toLocaleDateString("vi-VN"));
        } else {
          this.setDataValue("ngayPhanAnh", value);
        }
      },
    });
    await queryInterface.changeColumn("SuCo", "ngayKhacPhuc", {
      type: Sequelize.DATEONLY,
      allowNull: true,
      set: function (value) {
        if (value instanceof Date) {
          this.setDataValue("ngayKhacPhuc", value.toLocaleDateString("vi-VN"));
        } else {
          this.setDataValue("ngayKhacPhuc", value);
        }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("SuCo", "newColumn");
    await queryInterface.changeColumn("SuCo", "ngayPhanAnh", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn("SuCo", "ngayKhacPhuc", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
