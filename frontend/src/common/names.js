const API_ROOT =
  process.env.NODE_ENV === "production" && process.env.REACT_APP_HOST
    ? process.env.REACT_APP_HOST
    : "http://localhost:8003";

const routes = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  CART: "/cart",
  DETAILS: "/details/:id",
};

module.exports = { routes, API_ROOT };
