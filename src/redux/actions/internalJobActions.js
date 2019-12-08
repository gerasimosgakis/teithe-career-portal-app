import { API } from "aws-amplify";
import {
  ADD_JOB_POST_SUCCESS,
  ADD_JOB_POST_FAIL,
  GET_JOB_POSTS_SUCCESS,
  GET_JOB_POSTS_FAIL,
  SET_LOADING,
  GET_JOB_POSTS_BY_USER_SUCCESS,
  GET_JOB_POSTS_BY_USER_FAIL
} from "./types";
import { actionButton } from "@aws-amplify/ui";

// Get All Internal Jobs
export const getInternalJobs = () => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const jobs = await API.get("teithe-career-portal-posts-api", "/job-posts");
    console.log(jobs);
    dispatch({
      type: GET_JOB_POSTS_SUCCESS,
      payload: jobs
    });
  } catch (err) {
    dispatch({
      type: GET_JOB_POSTS_FAIL,
      payload: err
    });
    console.log(err);
  }
};

// Get All Internal Jobs By User
export const getInternalJobsByUser = userId => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const jobs = await API.get(
      "teithe-career-portal-posts-api",
      `/job-posts/${userId}`
    );
    dispatch({
      type: GET_JOB_POSTS_BY_USER_SUCCESS,
      payload: jobs.data
    });
  } catch (err) {
    dispatch({
      type: GET_JOB_POSTS_BY_USER_FAIL,
      payload: err
    });
  }
};

// Add new internal job
export const addInternalJob = data => async dispatch => {
  try {
    const job = await API.post("teithe-career-portal-posts-api", "/job-posts", {
      body: data
    });
    console.log(job);
    dispatch({
      type: ADD_JOB_POST_SUCCESS,
      payload: job.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADD_JOB_POST_FAIL,
      payload: err
    });
  }
};
