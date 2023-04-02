import db from "../models/index";
import bcrypt from "bcryptjs";
const { Op } = require("sequelize");

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserExist = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.CanBo.findOne({
        where: {
          [Op.or]: [
            { maCB: { [Op.like]: data.maCB } },
            { email: { [Op.like]: data.email } },
          ],
        },
        attributes: ["maCB"],
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      reject(err);
    }
  });
};

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data.maCB);
    try {
      const isExist = await checkUserExist(data);

      if (isExist === true) {
        resolve({
          errCode: 1,
          message: "User existed",
        });
      } else {
        const hashPassword = await hashUserPassword(data.password);

        const user = await db.CanBo.create(
          {
            maCB: data.maCB,
            maDV: data.maDV,
            hoTen: data.hoTen,
            email: data.email,
            password: hashPassword,
            SDT: data.SDT,
            diaChi: data.diaChi,
            chucVu: data.chucVu,
          },
          {
            fields: [
              "maCB",
              "maDV",
              "hoTen",
              "email",
              "password",
              "SDT",
              "diaChi",
              "chucVu",
            ],
          }
        );

        resolve({
          errCode: 0,
          message: "create new user successed",
          user,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const userLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      data.maCB = null;
      // console.log("check data: ", data.maCB);
      const isExist = await checkUserExist(data);
      // console.log("check exist: ", isExist);

      if (isExist) {
        const user = await db.CanBo.findOne({
          where: { email: data.email },
          attributes: [
            "maCB",
            "maDV",
            "hoTen",
            "email",
            "password",
            "SDT",
            "diaChi",
            "chucVu",
          ],
        });

        // console.log("check user: ", user);
        if (user) {
          const checkPassword = bcrypt.compareSync(
            data.password,
            user.password
          );

          if (checkPassword) {
            resolve({
              errCode: 0,
              message: "Login successful",
              user,
            });
          } else {
            resolve({
              errCode: 4,
              message: "Wrong password",
            });
          }
        } else {
          resolve({
            errCode: 3,
            message: "User not found !",
          });
        }
      } else {
        resolve({
          errCode: 1,
          message: "Your email isn't exist !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const verifyUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.password) {
        resolve({
          errCode: 2,
          message: "Missing parameter !",
        });
      }

      const user = await db.CanBo.findOne({
        where: { email: data.email, password: data.password },
        attributes: [
          "maCB",
          "maDV",
          "hoTen",
          "email",
          "password",
          "SDT",
          "diaChi",
          "chucVu",
        ],
      });
      console.log("check user server:", user);

      if (user) {
        resolve({
          errCode: 0,
          message: "Verify successful",
          user,
        });
      } else {
        resolve({
          errCode: 3,
          message: "User not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.CanBo.findAll({
        attributes: [
          "maCB",
          "maDV",
          "hoTen",
          "email",
          "SDT",
          "diaChi",
          "chucVu",
        ],
      });

      console.log(user.length);
      if (user.length) {
        resolve({
          errCode: 0,
          message: "Get all user successful",
          user,
        });
      } else {
        resolve({
          errCode: 3,
          message: "User list is empty",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const editUser = (data) => {
  console.log("check data: ", data);
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.maCB) {
        resolve({
          errCode: 2,
          message: "Missing parameters !",
        });
      }

      const [numAffectedRows, updatedRows] = await db.CanBo.update(
        {
          maDV: data.maDV,
          hoTen: data.hoTen,
          SDT: data.SDT,
          diaChi: data.diaChi,
          chucVu: data.chucVu,
        },
        {
          where: { maCB: data.maCB },
          attributes: ["maCB", "maDV", "hoTen", "SDT", "diaChi", "chucVu"],
          returning: true,
          plain: true,
        }
      );
      console.log("check update: ", numAffectedRows, updatedRows);

      const user = await db.CanBo.findOne({
        where: { maCB: data.maCB },
        raw: false,
        attributes: ["maCB", "maDV", "hoTen", "SDT", "diaChi", "chucVu"],
      });

      if (user) {
        // user.maDV = data.maDV;
        // user.hoTen = data.hoTen;
        // user.SDT = data.SDT;
        // user.diaChi = data.diaChi;
        // user.chucVu = data.chucVu;
        // console.log("check user: ", user);

        // await user.save({
        //   // fields: ["maCB", "maDV", "hoTen", "SDT", "diaChi", "chucVu"],
        //   attributes: [

        //     "maCB",
        //     "maDV",
        //     "hoTen",
        //     "SDT",
        //     "diaChi",
        //     "chucVu",
        //   ],
        // });
        console.log("User updated successfully:", user);

        resolve({
          errCode: 0,
          message: "User was edited",
          user,
        });
      } else {
        resolve({
          errCode: 3,
          message: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (maCB) => {
  return new Promise(async (resolve, reject) => {
    if (!maCB) {
      resolve({
        errCode: 1,
        message: "Missing pamareter !",
      });
    }
    try {
      const user = await db.CanBo.destroy({
        where: { maCB: maCB },
        attributes: ["maCB"],
      });
      console.log("check delete user: ", user);
      if (user) {
        resolve({
          errCode: 0,
          message: "The user has been deleted",
        });
      } else {
        resolve({
          errCode: 2,
          message: "User not found !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser,
  userLogin,
  getAllUsers,
  editUser,
  deleteUser,
  verifyUser,
};
