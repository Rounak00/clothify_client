import axios from "axios";
// import store from "../redux/store"; // adjust the path to your store
import { logout } from "../redux/slices/authSlice"; // your logout action
// import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// Add response interceptor
export const setupInterceptors = (store, navigate) => {
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 403) {
          store.dispatch(logout());
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  };

export default axiosInstance;