import { API } from "aws-amplify";
import {
  ADD_FAVORITE_JOB_SUCCESS,
  ADD_FAVORITE_JOB_FAIL,
  REMOVE_FAVORITE_JOB_SUCCESS,
  REMOVE_FAVORITE_JOB_FAIL,
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
  try {
    const result = await API.post("teithe-career-portal-api", "/favorite-job", {
      body: data
    });

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

// Remove Favorite Job
export const removeJob = jobId => async dispatch => {
  try {
    const result = await API.del(
      "teithe-career-portal-api",
      `/favorite-jobs/remove/${jobId}`
    );

    dispatch({
      type: REMOVE_FAVORITE_JOB_SUCCESS,
      payload: result
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: REMOVE_FAVORITE_JOB_FAIL,
      payload: error
    });
  }
};
