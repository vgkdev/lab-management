import db from "../models/index";

const createNewSemester = (data) => {
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await db.HocKy.findOne({
        where: {
          hocKy: data.hocKy,
        },
        attributes: ["hocKy"],
      });

      console.log("check exist: ", isExist);
      if (isExist) {
        resolve({
          errCode: 1,
          message: "semester existed",
        });
      } else {
        const semester = await db.HocKy.create(
          {
            hocKy: data.hocKy,
          },
          {
            fields: ["hocKy"],
          }
        );

        resolve({
          errCode: 0,
          message: "create new semester successed",
          semester,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllSemester = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const semester = await db.HocKy.findAll({
        attributes: ["hocKy"],
      });

      if (semester) {
        resolve({
          errCode: 0,
          message: "Get all semester successful",
          semester,
        });
      } else {
        resolve({
          errCode: 0,
          message: "semester list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editSemester = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.hocKy) {
        resolve({
          errCode: 2,
          message: "Missing parameters !",
        });
      }

      if (data.hocKy !== data.newHocKy) {
        const isExist = await db.HocKy.findOne({
          where: { hocKy: data.newHocKy },
          attributes: ["hocKy"],
        });

        if (isExist) {
          resolve({
            errCode: 2,
            message: "semester was existed",
          });
        }
      }

      const [numAffectedRows, updatedRows] = await db.HocKy.update(
        {
          hocKy: data.newHocKy,
        },
        {
          where: { hocKy: data.hocKy },
          attributes: ["hocKy"],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const semester = await db.HocKy.findOne({
          where: { hocKy: data.newHocKy },
          raw: false,
          attributes: ["hocKy"],
        });

        console.log("semester updated successfully:", semester);

        resolve({
          errCode: 0,
          message: "semester was edited",
          semester,
        });
      } else {
        resolve({
          errCode: 1,
          message: "semester not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteSemester = (hocKy) => {
  return new Promise(async (resolve, reject) => {
    try {
      const semester = await db.HocKy.destroy({
        where: { hocKy: hocKy },
        attributes: ["hocKy"],
      });

      console.log("check delete semester: ", semester);
      if (semester) {
        resolve({
          errCode: 0,
          message: "The semester has been deleted",
        });
      } else {
        resolve({
          errCode: 2,
          message: "semester not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewSemester,
  getAllSemester,
  editSemester,
  deleteSemester,
};
