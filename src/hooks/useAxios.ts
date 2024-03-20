import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

const axiosConfigs: CreateAxiosDefaults<any> = {
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  headers: {
    "Content-Type": "application/json",
  },
};

const useAxios: AxiosInstance = axios.create(axiosConfigs);

useAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default useAxios;
