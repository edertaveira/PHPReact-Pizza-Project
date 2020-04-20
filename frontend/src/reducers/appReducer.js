import userRoot from "./userReducer";
import cartRoot from "./cartReducer";
import favoriteRoot from "./favoriteReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  user: userRoot,
  cart: cartRoot,
  favorite: favoriteRoot,
});

export default appReducer;
