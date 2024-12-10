import axios from "axios";

export const ApiService = axios.create({
  baseURL: "http://localhost:8080/rgs/api/v1",
  headers: {
    "Content-Type": "application/json",
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
    return Promise.reject(error);
  }
);