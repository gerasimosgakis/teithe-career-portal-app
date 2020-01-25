import { Auth } from "aws-amplify";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CONFIRM_REGISTER_SUCCESS,
  CONFIRM_REGISTER_FAIL,
  CLEAR_AUTH_ERRORS,
  SET_LOADING
} from "./types";
import gravatar from "gravatar";

/**
 * registerUser
 * Registers user
 * @param {*} userData - the data for the user to be registered
 */
export const registerUser = userData => async dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: true
  });
  if (userData.password !== userData.confirmPassword) {
    dispatch({
      type: REGISTER_FAIL,
      payload: { message: `Passwords don't match` }
    });
    return;
  }
  try {
    const newUser = await Auth.signUp({
      username: userData.email,
      password: userData.password,
      attributes: {
        name: userData.name,
        "custom:role": userData.role
      }
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: newUser
    });
  } catch (error) {
    if (error.code === "UsernameExistsException") {
      await Auth.resendSignUp(userData.email);
      const newUser = {
        username: userData.email,
        password: userData.password,
        attributes: {
          name: userData.name,
          "custom:role": userData.role
        }
      };
      dispatch({
        type: REGISTER_SUCCESS,
        payload: newUser
      });
    } else {
      dispatch({
        type: REGISTER_FAIL,
        payload: { message: error }
      });
    }
  }
};

/**
 * confirmUser
 * Confirms registered user using the confirmation code
 * @param {*} userData - Data for user to be confirmed
 * @param {*} history
 */
export const confirmUser = (userData, history) => async dispatch => {
  try {
    await Auth.confirmSignUp(userData.email, userData.confirmationCode);
    dispatch({
      type: CONFIRM_REGISTER_SUCCESS
    });
    history.push("/login");
  } catch (error) {
    dispatch({
      type: CONFIRM_REGISTER_FAIL,
      payload: { message: error }
    });
  }
};

/**
 * loginUser
 * Signs user in
 * @param {*} userData - data for user to be logged in
 * @param {*} history
 */
export const loginUser = (userData, history) => async dispatch => {
  dispatch({
    type: "SET_LOADING",
    payload: true
  });
  try {
    await Auth.signIn(userData.email, userData.password);
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
    const avatar = gravatar.url(userData.email, {
      s: "30", // size
      r: "pg", // rating
      d: "mm" //default
    });
    user.avatar = avatar;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    });
    history.push("/profile");
  } catch (error) {
    if (error.code === "UserNotConfirmedException") {
      history.push("/register");
      try {
        await Auth.resendSignUp(userData.email);
        const newUser = {
          username: userData.email,
          password: userData.password,
          attributes: {
            name: userData.name
          }
        };
        dispatch({
          type: REGISTER_SUCCESS,
          payload: newUser
        });
      } catch (error) {
        dispatch({
          type: REGISTER_FAIL,
          payload: error
        });
      }
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: { message: error }
      });
    }
  }
};

/**
 * logoutUser
 * Signs user out
 * @param {*} history
 */
export const logoutUser = history => async dispatch => {
  try {
    await Auth.signOut();
    history.push("/");
    dispatch({
      type: LOGOUT_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error
    });
  }
};

/**
 * Clears errors
 */
export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_ERRORS
  });
};

/**
 * Sets loading
 * @param {*} loading - boolean
 */
export const setLoading = loading => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: loading
  });
};
