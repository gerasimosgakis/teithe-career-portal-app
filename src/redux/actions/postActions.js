import { API } from "aws-amplify";
import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  ADD_COMMENT_FAIL,
  ADD_COMMENT_SUCCESS,
  SET_LOADING,
  GET_COMMENTS_BY_POST_SUCCESS,
  GET_COMMENTS_BY_POST_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL
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
  try {
    dispatch({
      type: SET_LOADING
    });
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

// Delete Post
export const deletePost = id => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    const response = await API.del(
      "teithe-career-portal-posts-api",
      `/posts/${id}`
    );

    console.log(response);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: response.id
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_POST_FAIL,
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

// Add comment
export const addComment = data => async dispatch => {
  try {
    const response = await API.post(
      "teithe-career-portal-posts-api",
      "/comments",
      {
        body: data
      }
    );
    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload: err
    });
  }
};

// Get Comments by Post
export const getCommentsByPost = (postId, postIndex) => async dispatch => {
  try {
    // dispatch({
    //   type: SET_LOADING
    // });
    console.log(postId);
    const response = await API.get(
      "teithe-career-portal-posts-api",
      `/comments/${postId}`
    );
    console.log(response);

    dispatch({
      type: GET_COMMENTS_BY_POST_SUCCESS,
      payload: { comments: response.data, postIndex }
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_COMMENTS_BY_POST_FAIL,
      payload: err
    });
  }
};

// Delete Comment
export const deleteComment = id => async dispatch => {
  try {
    dispatch({
      type: SET_LOADING
    });
    await API.del("teithe-career-portal-posts-api", `/comments/delete/${id}`);

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: id
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: error
    });
  }
};
