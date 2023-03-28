import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllFaculty = () => {
  return axios.get(`${linkAPI}/get-all-faculty`);
};

export { getAllFaculty };
