import userRoot from "./userReducer";
import { combineReducers } from "redux"; 

const appReducer = combineReducers({
  'user': userRoot
});

export default appReducer;
