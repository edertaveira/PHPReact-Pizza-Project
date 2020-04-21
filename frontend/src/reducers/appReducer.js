import userRoot from "./userReducer";
import cartRoot from "./cartReducer";
import favoriteRoot from "./favoriteReducer";
import settingRoot from "./settingReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  user: userRoot,
  cart: cartRoot,
  favorite: favoriteRoot,
  setting: settingRoot,
});

export default appReducer;
