import { combineReducers } from "redux";
import auth from "./authReducer";
import profiles from "./profileReducer";
import posts from "./postReducer";

export default combineReducers({
  auth,
  profiles,
  posts
});
