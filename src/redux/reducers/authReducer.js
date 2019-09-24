import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CONFIRM_REGISTER_SUCCESS,
  CONFIRM_REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_USER,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SET_LOADING
} from "../actions/types";

const initialState = {
  isAuthenticated: null,
  userConfirmed: null,
  loading: true,
  user: null,
  errors: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_USER:
      return {
        ...state,
        user: {
          ...payload
        },
        isAuthenticated: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        userConfirmed: false,
        loading: false
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        userConfirmed: false,
        loading: false,
        errors: payload
      };
    case CONFIRM_REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        userConfirmed: true,
        loading: false
      };
    case CONFIRM_REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        userConfirmed: false,
        loading: false,
        errors: payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...payload
        },
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        errors: payload
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        errors: payload
      };
    default:
      return state;
  }
}
