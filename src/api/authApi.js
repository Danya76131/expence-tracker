import axios from "axios";
const api = axios.create({
  baseURL: "https://expense-tracker.b.goit.study/api/",
});
export const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = "";
};
