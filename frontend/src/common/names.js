const API_ROOT =
  process.env.NODE_ENV === "production" && process.env.REACT_APP_HOST
    ? process.env.REACT_APP_HOST
    : "http://localhost:8003";
const STORAGE_ROOT =
  process.env.NODE_ENV === "production" && process.env.REACT_APP_STORAGE
    ? process.env.REACT_APP_STORAGE
    : "http://localhost:8003/storage/img";

const routes = {
  HOME: "/",
  CART: "/cart",
  DETAILS: "/details/:id",
  CHECKOUT: "/checkout",
  ORDERS: "/orders",
  FAVORITES: "/favorites",
};

module.exports = { routes, API_ROOT,STORAGE_ROOT };
