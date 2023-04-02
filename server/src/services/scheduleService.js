import db from "../models/index";
import { sequelize } from "../config/connectDB";
const { QueryTypes } = require("sequelize");

const getAllSchedule = (data) => {
  //   console.log("check data server: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      //   const [schedule, metadata] = await sequelize
      //     .query(
      //       `
      //     SELECT
      //         NhomTH.idNhom,
      //         NhomTH.soLuong,
      //         NhomTH.yeuCauPhanMem,
      //         NhomTH.sttLHP,
      //         NhomTH.soTuan,
      //         lophp.namHoc,
      //         lophp.hocKy,
      //         lophp.maHP,
      //         lophp.tietBD,
      //         lophp.soTiet,
      //         phong.sttPhong,
      //         phong.tenPhong
      //     FROM
      //         Nhomth
      //         JOIN lophp ON NhomTH.sttLHP = lophp.sttLHP
      //         LEFT JOIN phong ON NhomTH.sttPhong = phong.sttPhong
      //         ORDER BY coalesce(NhomTH.soTuan, 99999) ASC
      //     `
      //     )
      //     .catch((err) => {
      //       console.error(err);
      //     });

      const [schedule, metadata] = await sequelize
        .query(
          `
          SELECT 
          lophp.tietBD,
          lophp.soTiet,
          lophp.namHoc,
          lophp.hocKy,
          nhomth.soTuan,
          phong.tenPhong as phongTH,
          CASE WHEN lophp.thu = "Thứ 2" THEN 
            JSON_OBJECT('idNhom', nhomth.idNhom, 'soLuong', nhomth.soLuong, 'yeuCauPhanMem', nhomth.yeuCauPhanMem, 'sttLHP', nhomth.sttLHP, 'maHP', lophp.maHP, 'maCB', lophp.maCB, 'tietBD', lophp.tietBD, 'soTiet', lophp.soTiet) 
          ELSE NULL END as thu2,
          CASE WHEN lophp.thu = "Thứ 3" THEN 
            JSON_OBJECT('idNhom', nhomth.idNhom, 'soLuong', nhomth.soLuong, 'yeuCauPhanMem', nhomth.yeuCauPhanMem, 'sttLHP', nhomth.sttLHP, 'maHP', lophp.maHP, 'maCB', lophp.maCB, 'tietBD', lophp.tietBD, 'soTiet', lophp.soTiet) 
          ELSE NULL END as thu3,
          CASE WHEN lophp.thu = "Thứ 4" THEN 
            JSON_OBJECT('idNhom', nhomth.idNhom, 'soLuong', nhomth.soLuong, 'yeuCauPhanMem', nhomth.yeuCauPhanMem, 'sttLHP', nhomth.sttLHP, 'maHP', lophp.maHP, 'maCB', lophp.maCB, 'tietBD', lophp.tietBD, 'soTiet', lophp.soTiet) 
          ELSE NULL END as thu4,
          CASE WHEN lophp.thu = "Thứ 5" THEN 
            JSON_OBJECT('idNhom', nhomth.idNhom, 'soLuong', nhomth.soLuong, 'yeuCauPhanMem', nhomth.yeuCauPhanMem, 'sttLHP', nhomth.sttLHP, 'maHP', lophp.maHP, 'maCB', lophp.maCB, 'tietBD', lophp.tietBD, 'soTiet', lophp.soTiet) 
          ELSE NULL END as thu5,
          CASE WHEN lophp.thu = "Thứ 6" THEN 
            JSON_OBJECT('idNhom', nhomth.idNhom, 'soLuong', nhomth.soLuong, 'yeuCauPhanMem', nhomth.yeuCauPhanMem, 'sttLHP', nhomth.sttLHP, 'maHP', lophp.maHP, 'maCB', lophp.maCB, 'tietBD', lophp.tietBD, 'soTiet', lophp.soTiet) 
          ELSE NULL END as thu6,
          CASE WHEN lophp.thu = "Thứ 7" THEN 
            JSON_OBJECT('idNhom', nhomth.idNhom, 'soLuong', nhomth.soLuong, 'yeuCauPhanMem', nhomth.yeuCauPhanMem, 'sttLHP', nhomth.sttLHP, 'maHP', lophp.maHP, 'maCB', lophp.maCB, 'tietBD', lophp.tietBD, 'soTiet', lophp.soTiet) 
          ELSE NULL END as thu7,
          CASE WHEN lophp.thu = "Chủ nhật" THEN 
            JSON_OBJECT('idNhom', nhomth.idNhom, 'soLuong', nhomth.soLuong, 'yeuCauPhanMem', nhomth.yeuCauPhanMem, 'sttLHP', nhomth.sttLHP, 'maHP', lophp.maHP, 'maCB', lophp.maCB, 'tietBD', lophp.tietBD, 'soTiet', lophp.soTiet) 
          ELSE NULL END as cn
        FROM
            NhomTH AS nhomth
            JOIN LopHP AS lophp ON nhomth.sttLHP = lophp.sttLHP AND lophp.namHoc = '${data.namHoc}' AND lophp.hocKy = '${data.hocKy}'
            JOIN Phong AS phong ON nhomth.sttPhong = phong.sttPhong

        `
        )
        .catch((err) => {
          console.error(err);
        });

      //   let dataSchedule = [];
      //   for (let i = 0; i < schedule.length; i++) {
      //     if (schedule[i].tietBD < 5) {
      //       dataSchedule[i].buoi = "Sáng";
      //     } else {
      //       dataSchedule[i].buoi = "Chiều";
      //     }
      //     dataSchedule[i].sttPhong = schedule[i].sttPhong;
      //   }

      //   const str =
      //     '{"idNhom": 12, "soLuong": 100, "yeuCauPhanMem": "visual studio code", "sttLHP": 3, "maHP": "CSN01"}';
      //   const obj = JSON.parse(str);
      //   console.log(obj);
      for (let i = 0; i < schedule.length; i++) {
        // console.log(schedule[i].thu2);
        if (schedule[i].tietBD < 5) {
          schedule[i].buoi = "Sáng";
        } else {
          schedule[i].buoi = "Chiều";
        }
        schedule[i].thu2 = JSON.parse(schedule[i].thu2);
        schedule[i].thu3 = JSON.parse(schedule[i].thu3);
        schedule[i].thu4 = JSON.parse(schedule[i].thu4);
        schedule[i].thu5 = JSON.parse(schedule[i].thu5);
        schedule[i].thu6 = JSON.parse(schedule[i].thu6);
        schedule[i].thu7 = JSON.parse(schedule[i].thu7);
        schedule[i].cn = JSON.parse(schedule[i].cn);
      }

      if (schedule.length) {
        resolve({
          errCode: 0,
          message: "Get all schedule successful",
          schedule,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Schedule list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllSchedule,
};
