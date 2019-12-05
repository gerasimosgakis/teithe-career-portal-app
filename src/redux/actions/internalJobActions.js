import { API } from "aws-amplify";
import { ADD_JOB_POST_SUCCESS, ADD_JOB_POST_FAIL } from "./types";

// Get All Internal Jobs
// export const getPosts = () => async dispatch => {
//   try {
//     dispatch({
//       type: "SET_LOADING",
//       payload: true
//     });
//     const posts = await API.get("teithe-career-portal-posts-api", "/posts");
//     console.log(posts);
//     dispatch({
//       type: GET_POSTS_SUCCESS,
//       payload: posts
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_POSTS_FAIL,
//       payload: error
//     });
//   }
// };

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

// export const addInternalJob = data => async dispatch => {
//   console.log(data);
//   try {
//     const post = await API.post("teithe-career-portal-posts-api", "/posts", {
//       body: data
//     });

//     console.log(post);
//     dispatch({
//       type: ADD_POST_SUCCESS,
//       payload: post.data
//     });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: ADD_POST_FAIL,
//       payload: error
//     });
//   }
// };
