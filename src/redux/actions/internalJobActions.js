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

/**
 * Get All Internal Jobs
 */
export const getInternalJobs = () => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: true
    });
    const jobs = await API.get("teithe-career-portal-api-part-2", "/job-posts");
    dispatch({
      type: GET_JOB_POSTS_SUCCESS,
      payload: jobs
    });
  } catch (err) {
    dispatch({
      type: GET_JOB_POSTS_FAIL,
      payload: err
    });
  }
};

/**
 * getInternalJobsByUser
 * Gets All Internal Jobs By User
 * @param {*} userId
 */
export const getInternalJobsByUser = userId => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING,
      payload: true
    });
    const jobs = await API.get(
      "teithe-career-portal-api-part-2",
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

/**
 * Adds new internal job
 * @param {*} data - Job data
 */
export const addInternalJob = data => async dispatch => {
  try {
    const job = await API.post(
      "teithe-career-portal-api-part-2",
      "/job-posts",
      {
        body: data
      }
    );
    dispatch({
      type: ADD_JOB_POST_SUCCESS,
      payload: job.data
    });
  } catch (err) {
    dispatch({
      type: ADD_JOB_POST_FAIL,
      payload: err
    });
  }
};

/**
 * Edits internal job
 * @param {*} id - Job id
 * @param {*} data - data for job to be editted
 */
export const editInternalJob = (id, data) => async dispatch => {
  try {
    const job = await API.put(
      "teithe-career-portal-api-part-2",
      `/job-posts/update/${id}`,
      {
        body: data
      }
    );
    dispatch({
      type: EDIT_JOB_POST_SUCCESS,
      payload: { id, data: job.data }
    });
  } catch (err) {
    dispatch({
      type: EDIT_JOB_POST_FAIL,
      payload: err
    });
  }
};

/**
 * Deletes internal job
 * @param {*} id - job to be deleted id
 */
export const deleteInternalJob = id => async dispatch => {
  try {
    await API.del("teithe-career-portal-api-part-2", `/job-posts/delete/${id}`);
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

/**
 * Searches Job Posts
 * @param {*} keys - Search key parameters
 */
export const searchJobPosts = keys => async dispatch => {
  try {
    const jobs = await API.post(
      "teithe-career-portal-api-part-2",
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
