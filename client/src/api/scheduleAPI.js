import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllSchedule = (data) => {
  console.log("check data client: ", data);
  return axios.get(`${linkAPI}/get-all-schedule`, {
    params: data,
  });
};

// const createNewSchedule = (data) => {
//   return axios.post(`${linkAPI}/create-new-schedule`, data);
// };

// const editSchedule = (data) => {
//   return axios.put(`${linkAPI}/edit-schedule`, data);
// };

// const daleteSchedule = (namHoc) => {
//   return axios.delete(`${linkAPI}/delete-schedule`, {
//     data: { namHoc: namHoc },
//   });
// };

export { getAllSchedule };
