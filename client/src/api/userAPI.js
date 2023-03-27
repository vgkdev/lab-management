import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const loginUser = (data) => {
  return axios.post(`${linkAPI}/login`, {
    email: data.email,
    password: data.password,
  });
};

const getAllUser = () => {
  return axios.get(`${linkAPI}/get-all-users`);
};

const createNewUser = (data) => {
  return axios.post(`${linkAPI}/create-new-user`, {
    email: data.email,
    password: data.password,
    maCB: data.maCB,
    maDV: data.maDV,
    SDT: data.SDT,
    hoTen: data.hoTen,
    diaChi: data.diaChi,
    chucVu: data.chucVu,
  });
};

const deleteUser = (maCB) => {
  // console.log("check maCB api: ", maCB);
  return axios.delete(`${linkAPI}/delete-user`, {
    data: {
      maCB: maCB,
    },
  });
};

const editUser = (data) => {
  return axios.put(`${linkAPI}/edit-user`, data);
};

export { loginUser, getAllUser, createNewUser, deleteUser, editUser };
