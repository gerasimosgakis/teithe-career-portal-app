import { API } from "aws-amplify";
import { GET_POSTS_SUCCESS, GET_POSTS_FAIL } from "./types";
// Get All Posts
export const getPosts = () => async dispatch => {
  try {
    dispatch({
      type: "SET_LOADING",
      payload: true
    });
    const posts = await API.get("teithe-career-portal-api", "/posts");
    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: posts
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload: error
    });
  }
};

// Add new Post
export const addPost = () => async dispatch => {
  // try {
  //   dispatch({
  //     type: "SET_LOADING",
  //     payload: true
  //   });
  //   const posts = await API.get("teithe-career-portal-api", "/posts");
  //   dispatch({
  //     type: GET_POSTS_SUCCESS,
  //     payload: posts
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: GET_POSTS_FAIL,
  //     payload: error
  //   });
  // }
};
