import axios from "axios";
import { AppError } from "../utils/AppError";

const api = axios.create({
  baseURL: "http://ifsafe-ifsp.vercel.app",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
