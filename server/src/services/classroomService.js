import db from "../models/index";
import { Op } from "sequelize";

const createNewClassroom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await db.Phong.findOne({
        where: {
          [Op.or]: [{ sttPhong: data.sttPhong }, { tenPhong: data.tenPhong }],
        },
        attributes: ["sttPhong", "tenPhong"],
      });

      console.log("check exist: ", isExist);
      if (isExist) {
        resolve({
          errCode: 1,
          message: "classroom existed",
        });
      } else {
        const classroom = await db.Phong.create(
          {
            sttPhong: data.sttPhong,
            tenPhong: data.tenPhong,
            soMay: data.soMay,
            cauHinhMay: data.cauHinhMay,
            ghiChu: data.ghiChu,
          },
          {
            fields: ["sttPhong", "tenPhong", "soMay", "cauHinhMay", "ghiChu"],
          }
        );

        resolve({
          errCode: 0,
          message: "create new classroom successed",
          classroom,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllClassroom = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const classroom = await db.Phong.findAll({
        attributes: ["sttPhong", "tenPhong", "soMay", "cauHinhMay", "ghiChu"],
      });

      if (classroom) {
        resolve({
          errCode: 0,
          message: "Get all classroom successful",
          classroom,
        });
      } else {
        resolve({
          errCode: 0,
          message: "classroom list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editClassroom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.tenPhong) {
        resolve({
          errCode: 2,
          message: "Missing parameters !",
        });
      }

      if (data.tenPhong !== data.newTenPhong) {
        const isExist = await db.Phong.findOne({
          where: { tenPhong: data.newTenPhong },
          attributes: ["tenPhong"],
        });

        if (isExist) {
          resolve({
            errCode: 2,
            message: "classroom was existed",
          });
        }
      }

      const [numAffectedRows, updatedRows] = await db.Phong.update(
        {
          tenPhong: data.newTenPhong,
          soMay: data.soMay,
          cauHinhMay: data.cauHinhMay,
          ghiChu: data.ghiChu,
        },
        {
          where: { tenPhong: data.tenPhong },
          attributes: ["tenPhong", "soMay", "cauHinhMay", "ghiChu"],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const classroom = await db.Phong.findOne({
          where: { tenPhong: data.newTenPhong },
          raw: false,
          attributes: ["sttPhong", "tenPhong", "soMay", "cauHinhMay", "ghiChu"],
        });

        console.log("classroom updated successfully:", classroom);

        resolve({
          errCode: 0,
          message: "classroom was edited",
          classroom,
        });
      } else {
        resolve({
          errCode: 1,
          message: "classroom not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteClassroom = (sttPhong) => {
  return new Promise(async (resolve, reject) => {
    try {
      const classroom = await db.Phong.destroy({
        where: { sttPhong: sttPhong },
        attributes: ["sttPhong"],
      });

      console.log("check delete classroom: ", classroom);
      if (classroom) {
        resolve({
          errCode: 0,
          message: "The classroom has been deleted",
        });
      } else {
        resolve({
          errCode: 2,
          message: "classroom not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewClassroom,
  getAllClassroom,
  editClassroom,
  deleteClassroom,
};
