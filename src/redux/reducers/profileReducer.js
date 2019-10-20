import {
  SET_LOADING,
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL
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
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...action.payload.profile,
          experiences: action.payload.experiences,
          educations: action.payload.educations
        },
        loading: false
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...action.payload.profile
        },
        loading: false
      };
    case CREATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
