import {
  SET_LOADING,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAIL
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
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case ADD_POST_FAIL:
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
      console.log(posts);
      return {
        ...state,
        posts
      };
    case ADD_LIKE_FAIL:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
