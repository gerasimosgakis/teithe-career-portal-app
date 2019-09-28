import { API } from "aws-amplify";
import { GET_PROFILES_SUCCESS, GET_PROFILES_FAIL } from "./types";

// Get All Profiles
export const getProfiles = () => async dispatch => {
  try {
    const profiles = await API.get("teithe-career-portal-api", "/profiles");
    dispatch({
      type: GET_PROFILES_SUCCESS,
      payload: profiles
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILES_FAIL,
      payload: error
    });
  }
};
