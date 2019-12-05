import { combineReducers } from "redux";
import auth from "./authReducer";
import profiles from "./profileReducer";
import posts from "./postReducer";
import jobs from "./jobReducer";
import internalJobs from "./internalJobsReducer";

export default combineReducers({
  auth,
  profiles,
  posts,
  jobs,
  internalJobs
});
