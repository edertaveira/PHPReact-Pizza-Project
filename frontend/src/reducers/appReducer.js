import userRoot from "./userReducer";
import cartRoot from "./cartReducer";
import { combineReducers } from "redux"; 

const appReducer = combineReducers({
  'user': userRoot,
  'cart': cartRoot
});

export default appReducer;
