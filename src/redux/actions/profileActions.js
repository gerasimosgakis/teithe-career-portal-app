import { API } from "aws-amplify";
import {
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL
} from "./types";

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

// Get profile by handle
export const getProfileByHandle = handle => async dispatch => {
  // dispatch(setProfileLoading());
  console.log(handle);
  try {
    dispatch({
      type: "SET_LOADING",
      payload: true
    });
    const profile = await API.get(
      "teithe-career-portal-api",
      `/profiles/handle/${handle}`
    );
    const educations = await API.get(
      "teithe-career-portal-api",
      `/educations/${profile[0].id}`
    );
    const experiences = await API.get(
      "teithe-career-portal-api",
      `/experiences/${profile[0].id}`
    );

    console.log(educations);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: {
        profile: profile[0],
        educations,
        experiences
      }
    });
    console.log(profile);
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: error
    });
  }
};
