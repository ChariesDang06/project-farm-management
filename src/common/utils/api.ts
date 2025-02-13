import axios from "axios";

// export const URL = "http://localhost:5000";
export const URL = "https://agriculture-traceability.vercel.app/";

const axiosClient = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log({ error });
    const { config, status, data } = error.response;
    if (
      (config.url === "/api/v1/auth/register" && status === 400) ||
      (config.url === "/api/v1/auth/login" && status === 401)
    ) {
      const newError = data.msg;
      throw new Error(newError);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
