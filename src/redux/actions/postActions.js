import { API } from "aws-amplify";
import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAIL
} from "./types";
// Get All Posts
export const getPosts = () => async dispatch => {
  try {
    dispatch({
      type: "SET_LOADING",
      payload: true
    });
    const posts = await API.get("teithe-career-portal-posts-api", "/posts");
    console.log(posts);
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
export const addPost = data => async dispatch => {
  console.log(data);
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
  try {
    const post = await API.post("teithe-career-portal-posts-api", "/posts", {
      body: data
    });

    console.log(post);
    dispatch({
      type: ADD_POST_SUCCESS,
      payload: post.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_POST_FAIL,
      payload: error
    });
  }
};

// Add new Like
export const addLike = (postId, userId, username, liked) => async dispatch => {
  console.log(postId, userId, username, liked);
  try {
    const addLike = await API.post("teithe-career-portal-posts-api", "/likes", {
      body: {
        post_id: postId,
        user_id: userId,
        username,
        liked
      }
    });

    console.log(addLike);
    dispatch({
      type: ADD_LIKE_SUCCESS,
      payload: { data: addLike.data, action: addLike.action }
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_LIKE_FAIL,
      payload: error
    });
  }
};
