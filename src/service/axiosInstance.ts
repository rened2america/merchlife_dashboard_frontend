import axios, { HeadersDefaults } from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("errordata", error.response.data.message === "confirm email");
    if (
      error.response.status === 403 &&
      error.response.data.message === "confirm email"
    ) {
      window.location.href = "/emailconfirm/token";
    }

    if (
      error.response.status === 403 &&
      error.response.data.message === "verify artist"
    ) {
      window.location.href = "/verifyartist/token";
    }

    if (error.response.status === 401) {
      console.log("error.response.status === 401", error);
      window.location.href = "/login";
    }
  }
);
export default axiosClient;
