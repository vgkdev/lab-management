import db from "../models/index";

const createNewFaculty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await db.DonVi.findOne({
        where: { maDV: data.maDV },
        attributes: ["maDV"],
      });

      if (isExist === true) {
        resolve({
          errCode: 1,
          message: "faculty existed",
        });
      } else {
        const faculty = await db.DonVi.create(
          {
            maDV: data.maDV,
            tenDV: data.tenDV,
          },
          {
            fields: ["maDV", "tenDV"],
          }
        );

        resolve({
          errCode: 0,
          message: "create new faculty successed",
          faculty,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllFaculty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const faculty = await db.DonVi.findAll({
        attributes: ["maDV", "tenDV"],
      });

      if (faculty) {
        resolve({
          errCode: 0,
          message: "Get all faculty successful",
          faculty,
        });
      } else {
        resolve({
          errCode: 0,
          message: "Faculty list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editFaculty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.maDV) {
        resolve({
          errCode: 2,
          message: "Missing parameters !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.DonVi.update(
        {
          maDV: data.newMaDV,
          tenDV: data.tenDV,
        },
        {
          where: { maDV: data.maDV },
          attributes: ["maDV", "tenDV"],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const faculty = await db.DonVi.findOne({
          where: { maDV: data.newMaDV },
          raw: false,
          attributes: ["maDV", "tenDV"],
        });

        console.log("Faculty updated successfully:", faculty);

        resolve({
          errCode: 0,
          message: "Faculty was edited",
          faculty,
        });
      } else {
        resolve({
          errCode: 1,
          message: "Faculty not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteFaculty = (maDV) => {
  return new Promise(async (resolve, reject) => {
    try {
      const faculty = await db.DonVi.destroy({
        where: { maDV: maDV },
        attributes: ["maDV"],
      });

      console.log("check delete faculty: ", faculty);
      if (faculty) {
        resolve({
          errCode: 0,
          message: "The faculty has been deleted",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Faculty not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewFaculty,
  getAllFaculty,
  editFaculty,
  deleteFaculty,
};
