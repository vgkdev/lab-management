import axios from "axios";

const linkAPI = "http://localhost:8080/api/v1/";

const loginUser = (data) => {
  return axios.post(`${linkAPI}/login`, {
    email: data.email,
    password: data.password,
  });
};

const getAllUser = () => {
  return axios.get(`${linkAPI}/get-all-users`);
};

export { loginUser, getAllUser };
