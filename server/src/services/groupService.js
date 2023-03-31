import db from "../models/index";
import { sequelize } from "../config/connectDB";
const { QueryTypes } = require("sequelize");

const createNewGroup = (data) => {
  //   console.log("check data: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      const group = await db.NhomTH.create(
        {
          soLuong: data.soLuong,
          yeuCauPhanMem: data.yeuCauPhanMem,
          sttLHP: data.sttLHP,
        },
        {
          fields: ["soLuong", "yeuCauPhanMem", "sttLHP"],
        }
      );

      resolve({
        errCode: 0,
        message: "create new group successed",
        group,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllGroup = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const group = await db.NhomTH.findAll({
        attributes: ["idNhom", "soLuong", "yeuCauPhanMem", "sttLHP"],
      });
      //   const [group, metadata] = await sequelize.query(
      //     `SELECT NhomTH.sttLHP, NhomTH.tietBD, NhomTH.soTiet, NhomTH.namHoc, NhomTH.hocKy, NhomTH.maHP, NhomTH.thu, NhomTH.maCB, CASE WHEN NhomTH.sttLHP IS NOT NULL THEN true ELSE false END as trangThaiDK, COUNT(NhomTH.sttLHP) AS tongSoNhom FROM NhomTH LEFT JOIN NhomTH ON NhomTH.sttLHP = NhomTH.sttLHP GROUP BY NhomTH.sttLHP, NhomTH.tietBD, NhomTH.soTiet, NhomTH.namHoc, NhomTH.hocKy, NhomTH.maHP, NhomTH.thu, NhomTH.maCB, trangThaiDK;` // { type: QueryTypes.SELECT }
      //   );
      if (group.length) {
        resolve({
          errCode: 0,
          message: "Get all group successful",
          group,
        });
      } else {
        resolve({
          errCode: 3,
          message: "group list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editGroup = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.idNhom) {
        resolve({
          errCode: 2,
          message: "Missing parameters !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.NhomTH.update(
        {
          soLuong: data.soLuong,
          yeuCauPhanMem: data.yeuCauPhanMem,
          sttLHP: data.sttLHP,
        },
        {
          where: { idNhom: data.idNhom },
          attributes: ["idNhom", "soLuong", "yeuCauPhanMem", "sttLHP"],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const group = await db.NhomTH.findOne({
          where: { sttLHP: data.sttLHP },
          attributes: ["idNhom", "soLuong", "yeuCauPhanMem", "sttLHP"],
        });

        console.log("group updated successfully:", group);

        resolve({
          errCode: 0,
          message: "group was edited",
          group,
        });
      } else {
        resolve({
          errCode: 3,
          message: "group not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteGroup = (idNhom) => {
  return new Promise(async (resolve, reject) => {
    try {
      const group = await db.NhomTH.destroy({
        where: { idNhom: idNhom },
        attributes: ["idNhom"],
      });

      console.log("check delete group: ", group);
      if (group) {
        resolve({
          errCode: 0,
          message: "The group has been deleted",
        });
      } else {
        resolve({
          errCode: 2,
          message: "group not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewGroup,
  getAllGroup,
  editGroup,
  deleteGroup,
};
