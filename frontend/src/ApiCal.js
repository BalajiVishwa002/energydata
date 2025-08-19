import axios from "axios";
import { baseurl } from "./Utils";

const API = axios.create({
  baseURL: baseurl,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API
