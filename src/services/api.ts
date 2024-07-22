import { AppError } from "@/utils/AppError";
import axios, { AxiosInstance } from "axios";

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (SignOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "https://ifsafe-ifsp.vercel.app",
}) as APIInstanceProps;

api.registerInterceptTokenManager = (signOut: SignOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (requestError) => {
      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
