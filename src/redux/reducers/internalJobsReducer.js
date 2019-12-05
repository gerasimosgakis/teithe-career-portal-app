import {
  SET_LOADING,
  ADD_JOB_POST_SUCCESS,
  ADD_JOB_POST_FAIL,
  GET_JOB_POSTS_SUCCESS,
  GET_JOB_POSTS_FAIL
} from "../actions/types";

const initialState = {
  internalJobs: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_JOB_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        internalJobs: [...state.internalJobs, action.payload]
      };
    case ADD_JOB_POST_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case GET_JOB_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        internalJobs: [...action.payload]
      };
    case GET_JOB_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    // case GET_FAVORITE_JOBS_SUCCESS:
    //   const favoriteJobs = [...action.payload].map(item => item.job_id);
    //   return {
    //     ...state,
    //     favoriteJobs,
    //     loading: false
    //   };
    // case GET_FAVORITE_JOBS_FAIL:
    //   return {
    //     ...state,
    //     loading: false,
    //     errors: action.payload
    //   };
    default:
      return state;
  }
}
