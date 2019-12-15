import { API } from "aws-amplify";
import {
  ADD_JOB_POST_SUCCESS,
  ADD_JOB_POST_FAIL,
  GET_JOB_POSTS_SUCCESS,
  GET_JOB_POSTS_FAIL,
  SET_LOADING,
  GET_JOB_POSTS_BY_USER_SUCCESS,
  GET_JOB_POSTS_BY_USER_FAIL,
  EDIT_JOB_POST_SUCCESS,
  EDIT_JOB_POST_FAIL,
  DELETE_JOB_POST_SUCCESS,
  DELETE_JOB_POST_FAIL,
  SEARCH_JOB_POSTS_FAIL,
  SEARCH_JOB_POSTS_SUCCESS
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

// Edit internal job
export const editInternalJob = (id, data) => async dispatch => {
  try {
    const job = await API.put(
      "teithe-career-portal-posts-api",
      `/job-posts/update/${id}`,
      {
        body: data
      }
    );
    console.log(job);
    dispatch({
      type: EDIT_JOB_POST_SUCCESS,
      payload: { id, data: job.data }
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: EDIT_JOB_POST_FAIL,
      payload: err
    });
  }
};

// Delete internal job
export const deleteInternalJob = id => async dispatch => {
  try {
    await API.del("teithe-career-portal-posts-api", `/job-posts/delete/${id}`);
    dispatch({
      type: DELETE_JOB_POST_SUCCESS,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: DELETE_JOB_POST_FAIL,
      payload: err
    });
  }
};

// Search Job Posts
export const searchJobPosts = keys => async dispatch => {
  try {
    const jobs = await API.post(
      "teithe-career-portal-posts-api",
      "/job-posts/search",
      {
        body: keys
      }
    );
    dispatch({
      type: SEARCH_JOB_POSTS_SUCCESS,
      payload: jobs.data
    });
  } catch (err) {
    dispatch({
      type: SEARCH_JOB_POSTS_FAIL,
      payload: err
    });
  }
};
