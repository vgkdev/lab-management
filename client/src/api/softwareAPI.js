import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllSoftware = () => {
  return axios.get(`${linkAPI}/get-all-software`);
};

const createNewSoftware = (data) => {
  return axios.post(`${linkAPI}/create-new-software`, data);
};

const editSoftware = (data) => {
  return axios.put(`${linkAPI}/edit-software`, data);
};

const daleteSoftware = (tenPM) => {
  return axios.delete(`${linkAPI}/delete-software`, {
    data: { tenPM: tenPM },
  });
};

export { getAllSoftware, createNewSoftware, editSoftware, daleteSoftware };
