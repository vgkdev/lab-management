import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllFaculty = () => {
  return axios.get(`${linkAPI}/get-all-faculty`);
};

const createNewFaculty = (data) => {
  return axios.post(`${linkAPI}/create-new-faculty`, data);
};

const editFaculty = (data) => {
  return axios.put(`${linkAPI}/edit-faculty`, data);
};

const daleteFaculty = (maDV) => {
  return axios.delete(`${linkAPI}/delete-faculty`, {
    data: { maDV: maDV },
  });
};

export { getAllFaculty, createNewFaculty, editFaculty, daleteFaculty };
