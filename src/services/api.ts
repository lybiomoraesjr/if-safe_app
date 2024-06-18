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
    (resquestError) => {
      // if (resquestError?.response?.status === 401) {
      //   if (
      //     resquestError.response.data === "token.invalid" ||
      //     resquestError.response.data === "token.expired"
      //   ) {
      //   }
      //   signOut();
      // }

      if (resquestError.response && resquestError.response.data) {
        return Promise.reject(new AppError(resquestError.response.data));
      } else {
        return Promise.reject(resquestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
