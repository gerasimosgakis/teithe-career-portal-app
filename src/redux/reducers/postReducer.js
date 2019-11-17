import {
  SET_LOADING,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL
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

    default:
      return state;
  }
}
