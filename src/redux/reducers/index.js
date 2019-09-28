import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./authReducer";
import profiles from "./profileReducer";

export default combineReducers({
  alert,
  auth,
  profiles
});
