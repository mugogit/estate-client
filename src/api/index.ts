import axios from "axios";

const BASE_URL = "http://localhost:3500/api/estates";

const clientFree = axios.create({
  baseURL: BASE_URL,
});

clientFree.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

clientFree.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export { clientFree };
