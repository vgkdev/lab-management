import db from "../models/index";

const createNewSemester = (data) => {
  console.log(data);
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await db.HocKy.findOne({
        where: {
          hocKy: data.hocKy,
          namHoc: data.namHoc,
        },
        attributes: ["hocKy", "namHoc"],
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
            namHoc: data.namHoc,
            soTuan: data.soTuan,
          },
          {
            fields: ["hocKy", "namHoc", "soTuan"],
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
        attributes: ["hocKy", "namHoc", "soTuan"],
      });

      if (semester.length) {
        resolve({
          errCode: 0,
          message: "Get all semester successful",
          semester,
        });
      } else {
        resolve({
          errCode: 3,
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

      if (data.hocKy !== data.newHocKy || data.namHoc !== data.newNamHoc) {
        const isExist = await db.HocKy.findOne({
          where: { hocKy: data.newHocKy, namHoc: data.newNamHoc },
          attributes: ["hocKy", "namHoc"],
        });

        if (isExist) {
          resolve({
            errCode: 1,
            message: "semester was existed",
          });
        }
      }

      const [numAffectedRows, updatedRows] = await db.HocKy.update(
        {
          hocKy: data.newHocKy,
          namHoc: data.newNamHoc,
          soTuan: data.soTuan,
        },
        {
          where: { hocKy: data.hocKy, namHoc: data.namHoc },
          attributes: ["hocKy", "namHoc", "soTuan"],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const semester = await db.HocKy.findOne({
          where: { hocKy: data.newHocKy, namHoc: data.newNamHoc },
          raw: false,
          attributes: ["hocKy", "namHoc", "soTuan"],
        });

        console.log("semester updated successfully:", semester);

        resolve({
          errCode: 0,
          message: "semester was edited",
          semester,
        });
      } else {
        resolve({
          errCode: 3,
          message: "semester not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteSemester = (hocKy, namHoc) => {
  return new Promise(async (resolve, reject) => {
    try {
      const semester = await db.HocKy.destroy({
        where: {
          hocKy: hocKy,
          namHoc: namHoc,
        },
        attributes: ["hocKy", "namHoc"],
      });

      console.log("check delete semester: ", semester);
      if (semester) {
        resolve({
          errCode: 0,
          message: "The semester has been deleted",
        });
      } else {
        resolve({
          errCode: 3,
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
