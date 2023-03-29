import db from "../models/index";

const createNewYear = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await db.NamHoc.findOne({
        where: { namHoc: data.namHoc },
        attributes: ["namHoc"],
      });

      console.log("check exist: ", isExist);
      if (isExist) {
        resolve({
          errCode: 1,
          message: "Year existed",
        });
      } else {
        const year = await db.NamHoc.create(
          {
            namHoc: data.namHoc,
          },
          {
            fields: ["namHoc"],
          }
        );

        resolve({
          errCode: 0,
          message: "create new year successed",
          year,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllYear = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const year = await db.NamHoc.findAll({
        attributes: ["namHoc"],
      });

      if (year.length) {
        resolve({
          errCode: 0,
          message: "Get all year successful",
          year,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Year list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editYear = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.namHoc) {
        resolve({
          errCode: 2,
          message: "Missing parameters !",
        });
      }

      if (data.namHoc !== data.newNamHoc) {
        const isExist = await db.NamHoc.findOne({
          where: { namHoc: data.newNamHoc },
          attributes: ["namHoc"],
        });

        if (isExist) {
          resolve({
            errCode: 2,
            message: "Year was existed",
          });
        }
      }

      const [numAffectedRows, updatedRows] = await db.NamHoc.update(
        {
          namHoc: data.newNamHoc,
        },
        {
          where: { namHoc: data.namHoc },
          attributes: ["namHoc"],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const year = await db.NamHoc.findOne({
          where: { namHoc: data.newNamHoc },
          raw: false,
          attributes: ["namHoc"],
        });

        console.log("year updated successfully:", year);

        resolve({
          errCode: 0,
          message: "year was edited",
          year,
        });
      } else {
        resolve({
          errCode: 1,
          message: "year not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteYear = (namHoc) => {
  return new Promise(async (resolve, reject) => {
    try {
      const year = await db.NamHoc.destroy({
        where: { namHoc: namHoc },
        attributes: ["namHoc"],
      });

      console.log("check delete year: ", year);
      if (year) {
        resolve({
          errCode: 0,
          message: "The year has been deleted",
        });
      } else {
        resolve({
          errCode: 3,
          message: "Year not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewYear,
  getAllYear,
  editYear,
  deleteYear,
};
