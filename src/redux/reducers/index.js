import { combineReducers } from "redux";
import auth from "./authReducer";
import profiles from "./profileReducer";
import posts from "./postReducer";
import jobs from "./jobReducer";

export default combineReducers({
  auth,
  profiles,
  posts,
  jobs
});
