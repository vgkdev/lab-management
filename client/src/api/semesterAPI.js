import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllSemester = () => {
  return axios.get(`${linkAPI}/get-all-semester`);
};

const createNewSemester = (data) => {
  return axios.post(`${linkAPI}/create-new-semester`, data);
};

const editSemester = (data) => {
  return axios.put(`${linkAPI}/edit-semester`, data);
};

const daleteSemester = (hocKy, namHoc) => {
  return axios.delete(`${linkAPI}/delete-semester`, {
    data: {
      hocKy: hocKy,
      namHoc: namHoc,
    },
  });
};

export { getAllSemester, createNewSemester, editSemester, daleteSemester };
