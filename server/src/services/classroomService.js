import db from "../models/index";

const createNewClassroom = (data) => {
  //   console.log("check data: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      const classroom = await db.LopHP.create(
        {
          tietBD: data.tietBD,
          soTiet: data.soTiet,
          namHoc: data.namHoc,
          hocKy: data.hocKy,
          maHP: data.maHP,
          thu: data.thu,
          maCB: data.maCB,
        },
        {
          fields: [
            "tietBD",
            "soTiet",
            "namHoc",
            "hocKy",
            "maHP",
            "thu",
            "maCB",
          ],
        }
      );

      resolve({
        errCode: 0,
        message: "create new classroom successed",
        classroom,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllClassroom = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const classroom = await db.LopHP.findAll({
        attributes: [
          "sttLHP",
          "tietBD",
          "soTiet",
          "namHoc",
          "hocKy",
          "maHP",
          "thu",
          "maCB",
        ],
      });

      if (classroom.length) {
        resolve({
          errCode: 0,
          message: "Get all classroom successful",
          classroom,
        });
      } else {
        resolve({
          errCode: 3,
          message: "classroom list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editClassroom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.sttLHP) {
        resolve({
          errCode: 2,
          message: "Missing parameters !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.LopHP.update(
        {
          tietBD: data.tietBD,
          soTiet: data.soTiet,
          namHoc: data.namHoc,
          hocKy: data.hocKy,
          maHP: data.maHP,
          thu: data.thu,
          maCB: data.maCB,
        },
        {
          where: { sttLHP: data.sttLHP },
          attributes: [
            "tietBD",
            "soTiet",
            "namHoc",
            "hocKy",
            "maHP",
            "thu",
            "maCB",
          ],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      if (updatedRows) {
        const classroom = await db.LopHP.findOne({
          where: { sttLHP: data.sttLHP },
          attributes: [
            "sttLHP",
            "tietBD",
            "soTiet",
            "namHoc",
            "hocKy",
            "maHP",
            "thu",
            "maCB",
          ],
        });

        console.log("classroom updated successfully:", classroom);

        resolve({
          errCode: 0,
          message: "classroom was edited",
          classroom,
        });
      } else {
        resolve({
          errCode: 1,
          message: "classroom not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteClassroom = (sttLHP) => {
  return new Promise(async (resolve, reject) => {
    try {
      const classroom = await db.LopHP.destroy({
        where: { sttLHP: sttLHP },
        attributes: ["sttLHP"],
      });

      console.log("check delete classroom: ", classroom);
      if (classroom) {
        resolve({
          errCode: 0,
          message: "The classroom has been deleted",
        });
      } else {
        resolve({
          errCode: 2,
          message: "classroom not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewClassroom,
  getAllClassroom,
  editClassroom,
  deleteClassroom,
};
