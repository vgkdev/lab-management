import db from "../models/index";
import { Op } from "sequelize";

const createNewRoom = (data) => {
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
          message: "Room existed",
        });
      } else {
        const room = await db.Phong.create(
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
          message: "create new room successed",
          room,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllRoom = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await db.Phong.findAll({
        attributes: ["sttPhong", "tenPhong", "soMay", "cauHinhMay", "ghiChu"],
      });

      if (room.length) {
        resolve({
          errCode: 0,
          message: "Get all room successful",
          room,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Room list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editRoom = (data) => {
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
            message: "Room was existed",
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
        const room = await db.Phong.findOne({
          where: { tenPhong: data.newTenPhong },
          raw: false,
          attributes: ["sttPhong", "tenPhong", "soMay", "cauHinhMay", "ghiChu"],
        });

        console.log("Room updated successfully:", room);

        resolve({
          errCode: 0,
          message: "Room was edited",
          room,
        });
      } else {
        resolve({
          errCode: 1,
          message: "Room not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteRoom = (sttPhong) => {
  return new Promise(async (resolve, reject) => {
    try {
      const room = await db.Phong.destroy({
        where: { sttPhong: sttPhong },
        attributes: ["sttPhong"],
      });

      console.log("check delete room: ", room);
      if (room) {
        resolve({
          errCode: 0,
          message: "The room has been deleted",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Room not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewRoom,
  getAllRoom,
  editRoom,
  deleteRoom,
};
