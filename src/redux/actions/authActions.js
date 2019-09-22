import { Auth } from "aws-amplify";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_USER
} from "./types";

export const registerUser = (userData, history) => async dispatch => {
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
        name: userData.name
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
          name: userData.name
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

export const loginUser = (userData, history) => async dispatch => {
  try {
    await Auth.signIn(userData.email, userData.password);
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    });
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
