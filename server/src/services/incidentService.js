import db from "../models/index";
import Sequelize from "sequelize";
import { sequelize } from "../config/connectDB";

const createNewIncident = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const incident = await db.SuCo.create(
        {
          noiDungPhanAnh: data.noiDungPhanAnh,
          trangThai: data.trangThai,
          noiDungKhacPhuc: data.noiDungKhacPhuc,
          ghiChuKhac: data.ghiChuKhac,
          ngayPhanAnh: data.ngayPhanAnh,
          ngayKhacPhuc: data.ngayKhacPhuc,
          sttPhong: data.sttPhong,
          maCB: data.maCB,
        },
        {
          fields: [
            "noiDungPhanAnh",
            "trangThai",
            "noiDungKhacPhuc",
            "ghiChuKhac",
            "ngayPhanAnh",
            "ngayKhacPhuc",
            "sttPhong",
            "maCB",
          ],
        }
      );

      resolve({
        errCode: 0,
        message: "create new incident successed",
        incident,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllIncident = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const [incident, metadata] = await sequelize.query(
        // "SELECT `SuCo`.`sttSuCo`, `SuCo`.`noiDungPhanAnh`, `SuCo`.`trangThai`, `SuCo`.`noiDungKhacPhuc`, `SuCo`.`ghiChuKhac`, `SuCo`.`ngayPhanAnh`, `SuCo`.`ngayKhacPhuc`, `SuCo`.`sttPhong`, `SuCo`.`maCB`, `CanBo`.`maCB` AS `CanBo.maCB`, `CanBo`.`hoTen` AS `hoTen` FROM `suco` AS `SuCo` LEFT OUTER JOIN `canbo` AS `CanBo` ON `SuCo`.`maCB` = `CanBo`.`maCB`"
        "SELECT `SuCo`.`sttSuCo`, `SuCo`.`noiDungPhanAnh`, `SuCo`.`trangThai`, `SuCo`.`noiDungKhacPhuc`, `SuCo`.`ghiChuKhac`, `SuCo`.`ngayPhanAnh`, `SuCo`.`ngayKhacPhuc`, `SuCo`.`sttPhong`, `SuCo`.`maCB`, `CanBo`.`maCB` AS `CanBo.maCB`, `CanBo`.`hoTen` AS `hoTen`, `Phong`.`sttPhong` AS `Phong.sttPhong`, `Phong`.`tenPhong` AS `tenPhong` FROM `suco` AS `SuCo` LEFT OUTER JOIN `canbo` AS `CanBo` ON `SuCo`.`maCB` = `CanBo`.`maCB` LEFT OUTER JOIN `phong` AS `Phong` ON `SuCo`.`sttPhong` = `Phong`.`sttPhong`;"
      );

      // const incident = await db.SuCo.findAll({
      //   attributes: { exclude: ["id"] },
      //   include: [
      //     {
      //       model: db.CanBo,
      //       attributes: ["maCB", "hoTen"],
      //     },
      //     {
      //       model: db.Phong,
      //       attributes: ["sttPhong", "tenPhong"],
      //     },
      //   ],
      // })
      //   .then((result) => {
      //     console.log(result);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      console.log(incident);
      if (incident.length) {
        resolve({
          errCode: 0,
          message: "Get all incident successful",
          incident,
        });
      } else {
        resolve({
          errCode: 3,
          message: "incident list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editIncident = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.sttSuCo) {
        resolve({
          errCode: 2,
          message: "Missing parameters !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.SuCo.update(
        {
          noiDungPhanAnh: data.noiDungPhanAnh,
          trangThai: data.trangThai,
          noiDungKhacPhuc: data.noiDungKhacPhuc,
          ghiChuKhac: data.ghiChuKhac,
          ngayPhanAnh: data.ngayPhanAnh,
          ngayKhacPhuc: data.ngayKhacPhuc,
          sttPhong: data.sttPhong,
          maCB: data.maCB,
        },
        {
          where: { sttSuCo: data.sttSuCo },
          attributes: [
            "noiDungPhanAnh",
            "trangThai",
            "noiDungKhacPhuc",
            "ghiChuKhac",
            "ngayPhanAnh",
            "ngayKhacPhuc",
            "sttPhong",
            "maCB",
          ],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const incident = await db.SuCo.findOne({
          where: { sttSuCo: data.sttSuCo },
          raw: false,
          attributes: [
            "sttSuCo",
            "noiDungPhanAnh",
            "trangThai",
            "noiDungKhacPhuc",
            "ghiChuKhac",
            "ngayPhanAnh",
            "ngayKhacPhuc",
            "sttPhong",
            "maCB",
          ],
        });

        console.log("Incident updated successfully:", incident);

        resolve({
          errCode: 0,
          message: "Incident was edited",
          incident,
        });
      } else {
        resolve({
          errCode: 1,
          message: "Incident not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteIncident = (sttSuCo) => {
  // console.log("check data server: ", sttSuCo);
  return new Promise(async (resolve, reject) => {
    try {
      const incident = await db.SuCo.destroy({
        where: { sttSuCo: sttSuCo },
        attributes: ["sttSuCo"],
      });

      console.log("check delete incident: ", incident);
      if (incident) {
        resolve({
          errCode: 0,
          message: "The incident has been deleted",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Incident not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewIncident,
  getAllIncident,
  editIncident,
  deleteIncident,
};
