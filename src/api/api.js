import axios from "axios";

const apiURLs = {
  development: "http://localhost:8000",
  production: "",
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

api.interceptors.request.use((config) => {
  const jsonLoggedUser = localStorage.getItem("loggedUser");
  const parsedLoggedUser = JSON.parse(jsonLoggedUser || '""');

  if (parsedLoggedUser.token) {
    config.headers = { Authorization: `Bearer ${parsedLoggedUser.token}` };
  }

  return config;
});

export { api };
