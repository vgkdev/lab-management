import db from "../models/index";
import { sequelize } from "../config/connectDB";
const { QueryTypes } = require("sequelize");

const createNewGroup = (data) => {
  console.log("check data: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (data.soTuan === "") {
        data.soTuan = null;
      }
      if (data.sttPhong === "") {
        data.sttPhong = null;
      }
      const group = await db.NhomTH.create(
        {
          soLuong: data.soLuong,
          yeuCauPhanMem: data.yeuCauPhanMem,
          sttLHP: data.sttLHP,
          soTuan: data.soTuan,
          sttPhong: data.sttPhong,
        },
        {
          fields: ["soLuong", "yeuCauPhanMem", "sttLHP", "soTuan", "sttPhong"],
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
      //   const group = await db.NhomTH.findAll({
      //     attributes: ["idNhom", "soLuong", "yeuCauPhanMem", "sttLHP"],
      //   });
      const [group, metadata] = await sequelize.query(
        `
          SELECT 
              NhomTH.idNhom,
              NhomTH.soLuong,
              NhomTH.yeuCauPhanMem,
              NhomTH.sttLHP,
              NhomTH.soTuan,
              LopHP.namHoc,
              LopHP.hocKy,
              LopHP.maHP,
              LopHP.tietBD,
              LopHP.soTiet,
              Phong.sttPhong,
              Phong.tenPhong,
              CASE WHEN NhomTH.soTuan IS NOT NULL AND Phong.sttPhong IS NOT NULL THEN true ELSE false END AS trangThaiSapLich
          FROM 
              NhomTH 
              JOIN LopHP ON NhomTH.sttLHP = LopHP.sttLHP 
              LEFT JOIN Phong ON NhomTH.sttPhong = Phong.sttPhong;
      `
      );

      for (let i = 0; i < group.length; i++) {
        if (group[i].trangThaiSapLich == 1) {
          group[i].trangThaiSapLich = "Đã sắp lịch";
        } else {
          group[i].trangThaiSapLich = "Chưa sắp lịch";
        }
      }
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
          soTuan: data.soTuan,
          sttPhong: data.sttPhong,
        },
        {
          where: { idNhom: data.idNhom },
          attributes: [
            "idNhom",
            "soLuong",
            "yeuCauPhanMem",
            "sttLHP",
            "soTuan",
            "sttPhong",
          ],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const group = await db.NhomTH.findOne({
          where: { sttLHP: data.sttLHP },
          attributes: [
            "idNhom",
            "soLuong",
            "yeuCauPhanMem",
            "sttLHP",
            "soTuan",
            "sttPhong",
          ],
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
