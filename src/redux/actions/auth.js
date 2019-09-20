import { Auth } from "aws-amplify";
import { REGISTER_SUCCESS } from "./types";

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
