import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllGroup = () => {
  return axios.get(`${linkAPI}/get-all-group`);
};

const createNewGroup = (data) => {
  return axios.post(`${linkAPI}/create-new-group`, data);
};

const editGroup = (data) => {
  return axios.put(`${linkAPI}/edit-group`, data);
};

const daleteGroup = (namHoc) => {
  return axios.delete(`${linkAPI}/delete-group`, {
    data: { namHoc: namHoc },
  });
};

export { getAllGroup, createNewGroup, editGroup, daleteGroup };
