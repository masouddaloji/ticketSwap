import axios, { AxiosRequestConfig } from "axios";

const baseURL = "https://biletpazar.com/wp-json/pana-events/v1/";

const config: AxiosRequestConfig = {
  baseURL,
  auth: {
    username: "api_user",
    password: "QgxX 6K6V ERys 1K7m u6Rb Cjcz",
  },
};

export const axiosInstance = axios.create(config);
