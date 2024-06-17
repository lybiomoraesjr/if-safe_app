import { AppError } from "@/utils/AppError";
import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (SignOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "https://ifsafe-ifsp.vercel.app",
}) as APIInstanceProps;



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
