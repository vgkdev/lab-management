import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const getAllCourse = () => {
  return axios.get(`${linkAPI}/get-all-course`);
};

const createNewCourse = (data) => {
  return axios.post(`${linkAPI}/create-new-course`, data);
};

const editCourse = (data) => {
  return axios.put(`${linkAPI}/edit-course`, data);
};

const daleteCourse = (maHP) => {
  return axios.delete(`${linkAPI}/delete-course`, {
    data: { maHP: maHP },
  });
};

export { getAllCourse, createNewCourse, editCourse, daleteCourse };
