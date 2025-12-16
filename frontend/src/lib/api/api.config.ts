import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173/api/v1"
    : "/api/v1";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default API;
