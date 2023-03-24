import db from "../models/index";

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
      const incident = await db.SuCo.findAll({
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

      if (incident) {
        resolve({
          errCode: 0,
          message: "Get all incident successful",
          incident,
        });
      } else {
        resolve({
          errCode: 0,
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
