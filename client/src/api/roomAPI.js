import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllRoom = () => {
  return axios.get(`${linkAPI}/get-all-room`);
};

const createNewRoom = (data) => {
  return axios.post(`${linkAPI}/create-new-room`, data);
};

const editRoom = (data) => {
  return axios.put(`${linkAPI}/edit-room`, data);
};

const daleteRoom = (sttPhong) => {
  return axios.delete(`${linkAPI}/delete-room`, {
    data: { sttPhong: sttPhong },
  });
};

export { getAllRoom, createNewRoom, editRoom, daleteRoom };
