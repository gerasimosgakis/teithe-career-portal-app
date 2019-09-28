import {
  GET_PROFILES_SUCCESS,
  SET_LOADING,
  GET_PROFILES_FAIL
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILES_SUCCESS:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case GET_PROFILES_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
