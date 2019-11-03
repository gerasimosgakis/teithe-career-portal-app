import { API } from "aws-amplify";
import gravatar from "gravatar";
import {
  GET_PROFILES_SUCCESS,
  GET_PROFILES_FAIL,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL
} from "./types";

// Get All Profiles
export const getProfiles = () => async dispatch => {
  try {
    dispatch({
      type: "SET_LOADING",
      payload: true
    });
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

// Get Profile By Id
export const getProfileById = id => async dispatch => {
  console.log(id);

  try {
    dispatch({
      type: "SET_LOADING",
      payload: true
    });
    const profile = await API.get(
      "teithe-career-portal-api",
      `/profiles/${id}`
    );
    const educations = await API.get(
      "teithe-career-portal-api",
      `/educations/${id}`
    );
    const experiences = await API.get(
      "teithe-career-portal-api",
      `/experiences/${id}`
    );
    console.log(profile);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: {
        profile: profile,
        educations,
        experiences
      }
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload: error
    });
  }
};

// Get profile by handle
export const getProfileByHandle = handle => async dispatch => {
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

// Create Profile
export const createProfile = (
  user,
  email,
  profileData,
  history
) => async dispatch => {
  console.log(typeof profileData.skills, profileData);
  //profileData.skills = profileData.skills ? profileData.skills.split(",") : [];
  profileData.id = user;
  // if (profileData.skills && typeof profileData.skills === "string") {
  //   profileData.skills = profileData.skills.split(",");
  // } else if (profileData.skills && typeof profileData.skills === "object") {
  //   profileData.skills = profileData.skills;
  // } else {
  //   profileData.skills = [];
  // }
  const avatar = gravatar.url(email, {
    s: "300", // size
    r: "pg", // rating
    d: "mm" //default
  });
  console.log(avatar);
  profileData.avatar = avatar;
  console.log(profileData);
  try {
    await API.post("teithe-career-portal-api", `/profiles`, {
      body: profileData
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
    history.push("/profile");
  } catch (err) {
    console.log(err);
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload: err
    });
  }
};

// Edit Profile
export const editProfile = (
  user,
  email,
  profileData,
  history
) => async dispatch => {
  console.log(typeof profileData.skills, profileData);
  //profileData.skills = profileData.skills ? profileData.skills.split(",") : [];
  profileData.id = user;
  // if (profileData.skills && typeof profileData.skills === "string") {
  //   profileData.skills = profileData.skills.split(",");
  // } else if (profileData.skills && typeof profileData.skills === "object") {
  //   profileData.skills = profileData.skills;
  // } else {
  //   profileData.skills = [];
  // }
  const avatar = gravatar.url(email, {
    s: "300", // size
    r: "pg", // rating
    d: "mm" //default
  });
  console.log(avatar);
  profileData.avatar = avatar;
  console.log(profileData);
  try {
    const editProfileResponse = await API.put(
      "teithe-career-portal-api",
      `/profiles/${profileData.id}`,
      {
        body: profileData
        // headers: {
        //   // set custom header id for testing
        //   "cognito-identity-id": user
        // }
      }
    );
    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: editProfileResponse
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err
    });
  }
};

// Add Experience
export const addExperience = expData => async dispatch => {
  console.log(expData);

  try {
    await API.post("teithe-career-portal-api", `/experiences`, {
      body: expData
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CREATE_PROFILE_FAIL,
    //   payload: err
    // });
  }
};

// Edit Experience
export const editExperience = expData => async dispatch => {
  console.log(expData);

  try {
    await API.put("teithe-career-portal-api", `/experiences/${expData.id}`, {
      body: expData
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CREATE_PROFILE_FAIL,
    //   payload: err
    // });
  }
};

// Add Education
export const addEducation = eduData => async dispatch => {
  console.log(eduData);

  try {
    await API.post("teithe-career-portal-api", `/educations`, {
      body: eduData
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CREATE_PROFILE_FAIL,
    //   payload: err
    // });
  }
};

// Edit Education
export const editEducation = eduData => async dispatch => {
  console.log(eduData);

  try {
    await API.put("teithe-career-portal-api", `/educations/${eduData.id}`, {
      body: eduData
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CREATE_PROFILE_FAIL,
    //   payload: err
    // });
  }
};
