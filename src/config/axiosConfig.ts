import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL =
  "http://ec2-3-137-181-232.us-east-2.compute.amazonaws.com/api/v1";

const axiosInstance = axios.create();

// Add a request interceptor for adding the token to the header
axiosInstance.interceptors.request.use(
  (config) => {
    let token;

    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user")!);
      token = user.token;
    }

    if (token) {
      if (config.url !== "/login" && config.url !== "/register") {
        config.headers.Authorization = `Bearer ${token}`;
        // console.info("Token: ", token);
        // console.info("Config: ", config);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.error("Session Expired");
    }

    if (error.response.status === 403) {
      toast.error("Unauthorized");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
