import { AppError } from "@/utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "https://ifsafe-ifsp.vercel.app",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data));
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
