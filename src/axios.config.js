import axios from "axios";
const environment = import.meta.env.VITE_ENVIRONMENT;
const axiosInstance = axios.create({
  baseURL:
    environment === "dev"
      ? "http://localhost:5000/api/"
      : "https://api2.etchat.ml/api/",
});

export default axiosInstance;
