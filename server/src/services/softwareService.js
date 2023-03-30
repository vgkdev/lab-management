import db from "../models/index";

const createNewSoftware = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await db.PhanMem.findOne({
        where: { tenPM: data.tenPM },
        attributes: ["tenPM"],
      });

      console.log("check exist: ", isExist);
      if (isExist) {
        resolve({
          errCode: 1,
          message: "software existed",
        });
      } else {
        if (data.ghiChu === "") {
          data.ghiChu = "Trống";
        }
        const software = await db.PhanMem.create(
          {
            tenPM: data.tenPM,
            phienBan: data.phienBan,
            ghiChu: data.ghiChu,
          },
          {
            fields: ["tenPM", "phienBan", "ghiChu"],
          }
        );

        resolve({
          errCode: 0,
          message: "create new software successed",
          software,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllSoftware = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const software = await db.PhanMem.findAll({
        attributes: ["sttPM", "tenPM", "phienBan", "ghiChu"],
      });

      if (software.length) {
        resolve({
          errCode: 0,
          message: "Get all software successful",
          software,
        });
      } else {
        resolve({
          errCode: 3,
          message: "software list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editSoftware = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.tenPM) {
        resolve({
          errCode: 2,
          message: "Missing parameters !",
        });
      }

      if (data.tenPM !== data.newTenPM) {
        const isExist = await db.PhanMem.findOne({
          where: { tenPM: data.newTenPM },
          attributes: ["tenPM"],
        });

        if (isExist) {
          resolve({
            errCode: 1,
            message: "software was existed",
          });
        }
      }

      if (data.ghiChu === "") {
        data.ghiChu = "Trống";
      }
      const [numAffectedRows, updatedRows] = await db.PhanMem.update(
        {
          tenPM: data.newTenPM,
          phienBan: data.phienBan,
          ghiChu: data.ghiChu,
        },
        {
          where: { tenPM: data.tenPM },
          attributes: ["tenPM", "phienBan", "ghiChu"],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const software = await db.PhanMem.findOne({
          where: { tenPM: data.newTenPM },
          raw: false,
          attributes: ["sttPM", "tenPM", "phienBan", "ghiChu"],
        });

        console.log("software updated successfully:", software);

        resolve({
          errCode: 0,
          message: "software was edited",
          software,
        });
      } else {
        resolve({
          errCode: 3,
          message: "software not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteSoftware = (tenPM) => {
  return new Promise(async (resolve, reject) => {
    try {
      const software = await db.PhanMem.destroy({
        where: { tenPM: tenPM },
        attributes: ["tenPM"],
      });

      console.log("check delete software: ", software);
      if (software) {
        resolve({
          errCode: 0,
          message: "The software has been deleted",
        });
      } else {
        resolve({
          errCode: 3,
          message: "Software not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewSoftware,
  getAllSoftware,
  editSoftware,
  deleteSoftware,
};
