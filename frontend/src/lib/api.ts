import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7200/api/v1",
  withCredentials: true,
});

export default API;
