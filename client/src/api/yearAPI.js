import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllYear = () => {
  return axios.get(`${linkAPI}/get-all-year`);
};

const createNewYear = (data) => {
  return axios.post(`${linkAPI}/create-new-year`, data);
};

const editYear = (data) => {
  return axios.put(`${linkAPI}/edit-year`, data);
};

const daleteYear = (namHoc) => {
  return axios.delete(`${linkAPI}/delete-year`, {
    data: { namHoc: namHoc },
  });
};

export { getAllYear, createNewYear, editYear, daleteYear };
