import {
  SET_LOADING,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  GET_COMMENTS_BY_POST_SUCCESS,
  GET_COMMENTS_BY_POST_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL
} from "../actions/types";

const initialState = {
  posts: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case ADD_POST_SUCCESS:
      const currentPost = { ...action.payload, likes: 0 };
      return {
        ...state,
        posts: [currentPost, ...state.posts],
        loading: false
      };
    case ADD_POST_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case DELETE_POST_SUCCESS:
      const postsAfterDelete = [...state.posts].filter(post => {
        return post.id !== action.payload;
      });
      return {
        ...state,
        posts: postsAfterDelete,
        loading: false
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case ADD_LIKE_SUCCESS:
      const posts = [...state.posts];
      const postIndex = posts.findIndex(
        post => post.id === action.payload.data.post_id
      );

      if (action.payload.action === "added") {
        posts[postIndex].likes += 1;
      } else if (action.payload.action === "removed") {
        posts[postIndex].likes -= 1;
      }
      return {
        ...state,
        posts
      };
    case ADD_LIKE_FAIL:
      return {
        ...state,
        errors: action.payload
      };
    case ADD_COMMENT_SUCCESS:
      const commentedPostIndex = state.posts.findIndex(
        post => post.id === action.payload.post_id
      );
      const newPosts = [...state.posts];
      if (!newPosts[commentedPostIndex].comments) {
        newPosts[commentedPostIndex].comments = [];
      }
      newPosts[commentedPostIndex].comments.unshift(action.payload);
      return {
        ...state,
        posts: newPosts,
        loading: false
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        errors: action.payload
      };
    case GET_COMMENTS_BY_POST_SUCCESS:
      const postsWithComments = [...state.posts];
      postsWithComments[action.payload.postIndex]["comments"] =
        action.payload.comments;
      return {
        ...state,
        posts: postsWithComments,
        loading: false
      };
    case GET_COMMENTS_BY_POST_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
