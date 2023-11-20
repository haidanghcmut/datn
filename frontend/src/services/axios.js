import axios from "axios";

const baseURL = "http://localhost:8000";
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = token ? token : "";
};

export const postPredict = (file) => api.post(`/predictions/`, file);
export const signupUser = (payload) => api.post(`/signup/`, payload);
export const signinUser = (payload) => api.post(`/signin/`, payload);

export const getToken = () => {
  return localStorage.getItem("token");
};

const token = getToken();
if (token) {
  setAuthorization(token);
}
