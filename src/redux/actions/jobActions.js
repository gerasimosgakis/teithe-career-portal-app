import { API } from "aws-amplify";
import {
  ADD_FAVORITE_JOB_SUCCESS,
  ADD_FAVORITE_JOB_FAIL,
  GET_FAVORITE_JOBS_SUCCESS,
  GET_FAVORITE_JOBS_FAIL
} from "./types";

// Get All Favorite Jobs
export const getFavJobs = userId => async dispatch => {
  try {
    dispatch({
      type: "SET_LOADING",
      payload: true
    });
    const jobs = await API.get(
      "teithe-career-portal-api",
      `/favorite-jobs/${userId}`
    );
    console.log(jobs);
    dispatch({
      type: GET_FAVORITE_JOBS_SUCCESS,
      payload: jobs
    });
  } catch (error) {
    dispatch({
      type: GET_FAVORITE_JOBS_FAIL,
      payload: error
    });
  }
};

// Add Favorite Job
export const addJob = data => async dispatch => {
  console.log(data);
  try {
    const result = await API.post("teithe-career-portal-api", "/favorite-job", {
      body: data
    });

    console.log(result);
    dispatch({
      type: ADD_FAVORITE_JOB_SUCCESS,
      payload: result
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_FAVORITE_JOB_FAIL,
      payload: error
    });
  }
};
