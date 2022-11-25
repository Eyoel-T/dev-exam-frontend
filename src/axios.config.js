import axios from "axios";
const environment = import.meta.env.VITE_ENVIRONMENT;
const axiosInstance = axios.create({
  baseURL:
    environment === "dev"
      ? "http://localhost:5000/api/"
      : "https://dev-exam-api.onrender.com/api/",
});

export default axiosInstance;
