import {
  SET_LOADING,
  GET_FAVORITE_JOBS_SUCCESS,
  GET_FAVORITE_JOBS_FAIL
} from "../actions/types";

const initialState = {
  favoriteJobs: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FAVORITE_JOBS_SUCCESS:
      const favoriteJobs = [...action.payload].map(item => item.job_id);
      return {
        ...state,
        favoriteJobs,
        loading: false
      };
    case GET_FAVORITE_JOBS_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
