import {
  SET_LOADING,
  ADD_JOB_POST_SUCCESS,
  ADD_JOB_POST_FAIL,
  EDIT_JOB_POST_SUCCESS,
  EDIT_JOB_POST_FAIL,
  GET_JOB_POSTS_SUCCESS,
  GET_JOB_POSTS_FAIL,
  GET_JOB_POSTS_BY_USER_SUCCESS,
  GET_JOB_POSTS_BY_USER_FAIL,
  DELETE_JOB_POST_SUCCESS,
  DELETE_JOB_POST_FAIL
} from "../actions/types";

const initialState = {
  internalJobs: [],
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
        internalJobs: [action.payload, ...state.internalJobs]
      };
    case ADD_JOB_POST_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case EDIT_JOB_POST_SUCCESS:
      const jobIndex = state.internalJobs.findIndex(item => {
        return item.id === action.payload.id;
      });
      console.log(jobIndex);
      const updatedJobs = [...state.internalJobs];
      updatedJobs[jobIndex] = { ...action.payload.data };
      return {
        ...state,
        loading: false,
        internalJobs: updatedJobs
      };
    case EDIT_JOB_POST_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case DELETE_JOB_POST_SUCCESS:
      console.log(action.payload);
      const deletedJobIndex = state.internalJobs.findIndex(item => {
        return item.id === action.payload;
      });
      console.log(action.payload, deletedJobIndex);
      const newUpdatedJobs = [...state.internalJobs];
      newUpdatedJobs.splice(deletedJobIndex, 1);
      // updatedJobs[jobIndex] = { ...action.payload.data };
      return {
        ...state,
        loading: false,
        internalJobs: newUpdatedJobs
      };
    case DELETE_JOB_POST_FAIL:
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
    case GET_JOB_POSTS_BY_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        internalJobs: [...action.payload]
      };
    case GET_JOB_POSTS_BY_USER_FAIL:
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
