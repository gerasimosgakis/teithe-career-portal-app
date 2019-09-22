import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./authReducer";

export default combineReducers({
  alert,
  auth
});
