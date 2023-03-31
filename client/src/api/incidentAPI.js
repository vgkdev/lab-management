import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllIncident = () => {
  return axios.get(`${linkAPI}/get-all-incident`);
};

const createNewIncident = (data) => {
  return axios.post(`${linkAPI}/create-new-incident`, data);
};

const editIncident = (data) => {
  return axios.put(`${linkAPI}/edit-incident`, data);
};

const daleteIncident = (sttSuCo) => {
  return axios.delete(`${linkAPI}/delete-incident`, {
    data: { sttSuCo: sttSuCo },
  });
};

export { getAllIncident, createNewIncident, editIncident, daleteIncident };
