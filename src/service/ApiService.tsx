import axios from "axios";

export const ApiService = axios.create({
  baseURL: "https://localhost:8080/api/rgs/v1",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

ApiService.interceptors.request.use(
  (request) => {
    if (!request.url?.includes("/auth")) {
      request.headers["Authorization"] = "Bearer " + localStorage.getItem("accessToken");
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      alert("Unauthorized access - Redirecting to login...");
    }
    return Promise.reject(error);
  }
);
