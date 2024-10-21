import { API_BASE_URL } from "@/env";
import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

import axios from "axios";

const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
});

const setupRequestInterceptors = (
  instance: AxiosInstance,
  cb?: (config: InternalAxiosRequestConfig<unknown>) => void,
  errorCb?: (error: unknown) => void
) => {
  instance.interceptors.request.use(
    (config) => {
      config.headers.Authorization = localStorage.getItem("token");
      if (cb) cb(config);
      return config;
    },
    (error) => {
      if (errorCb) errorCb(error);
      return Promise.reject(error);
    }
  );
};

setupRequestInterceptors(apiInstance);

export { apiInstance };
