const API_ROOT =
  process.env.NODE_ENV === "production" && process.env.REACT_APP_HOST
    ? process.env.REACT_APP_HOST
    : "localhost:8080";

const routes = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
};

module.exports = { routes, API_ROOT };
