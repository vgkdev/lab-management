import db from "../models/index";

const createNewCourse = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExist = await db.HocPhan.findOne({
        where: { maHP: data.maHP },
        attributes: ["maHP"],
      });

      console.log("check exist: ", isExist);
      if (isExist) {
        resolve({
          errCode: 1,
          message: "Course existed",
        });
      } else {
        const course = await db.HocPhan.create(
          {
            maHP: data.maHP,
            tenNHP: data.tenNHP,
          },
          {
            fields: ["maHP", "tenNHP"],
          }
        );

        resolve({
          errCode: 0,
          message: "create new course successed",
          course,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllCourse = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const course = await db.HocPhan.findAll({
        attributes: ["maHP", "tenNHP"],
      });

      if (course.length) {
        resolve({
          errCode: 0,
          message: "Get all course successful",
          course,
        });
      } else {
        resolve({
          errCode: 3,
          message: "Course list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editCourse = (data) => {
  console.log("check data server: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.maHP) {
        resolve({
          errCode: 2,
          message: "Missing parameters !",
        });
      }

      if (data.maHP !== data.newMaHP) {
        const isExist = await db.HocPhan.findOne({
          where: { maHP: data.newMaHP },
          attributes: ["maHP"],
        });

        if (isExist) {
          resolve({
            errCode: 2,
            message: "Course was existed",
          });
        }
      }

      const [numAffectedRows, updatedRows] = await db.HocPhan.update(
        {
          maHP: data.newMaHP,
          tenNHP: data.tenNHP,
        },
        {
          where: { maHP: data.maHP },
          attributes: ["maHP", "tenNHP"],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const course = await db.HocPhan.findOne({
          where: { maHP: data.newMaHP },
          raw: false,
          attributes: ["maHP", "tenNHP"],
        });

        console.log("course updated successfully:", course);

        resolve({
          errCode: 0,
          message: "course was edited",
          course,
        });
      } else {
        resolve({
          errCode: 1,
          message: "course not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteCourse = (maHP) => {
  return new Promise(async (resolve, reject) => {
    try {
      const course = await db.HocPhan.destroy({
        where: { maHP: maHP },
        attributes: ["maHP"],
      });

      console.log("check delete course: ", course);
      if (course) {
        resolve({
          errCode: 0,
          message: "The course has been deleted",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Course not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewCourse,
  getAllCourse,
  editCourse,
  deleteCourse,
};
