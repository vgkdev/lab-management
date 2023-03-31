import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllClassroom = () => {
  return axios.get(`${linkAPI}/get-all-classroom`);
};

const createNewClassroom = (data) => {
  return axios.post(`${linkAPI}/create-new-classroom`, data);
};

const editClassroom = (data) => {
  return axios.put(`${linkAPI}/edit-classroom`, data);
};

const daleteClassroom = (sttLHP) => {
  return axios.delete(`${linkAPI}/delete-classroom`, {
    data: { sttLHP: sttLHP },
  });
};

export { getAllClassroom, createNewClassroom, editClassroom, daleteClassroom };
