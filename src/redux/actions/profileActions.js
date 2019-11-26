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
  EDIT_PROFILE_FAIL,
  EDIT_EXPERIENCE_SUCCESS,
  EDIT_EXPERIENCE_FAIL,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  EDIT_EDUCATION_SUCCESS,
  EDIT_EDUCATION_FAIL,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAIL,
  SEARCH_GRADUATES_SUCCESS,
  SEARCH_GRADUATES_FAIL
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
    const profile = await API.get("teithe-career-portal-api", `/profile/${id}`);
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

// Search Graduates
export const searchGraduates = params => async dispatch => {
  try {
    const profiles = await API.post("teithe-career-portal-api", "/search", {
      body: params
    });
    dispatch({
      type: SEARCH_GRADUATES_SUCCESS,
      payload: { profiles }
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SEARCH_GRADUATES_FAIL,
      payload: err
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
    const response = await API.post(
      "teithe-career-portal-api",
      `/experiences`,
      {
        body: expData
        // headers: {
        //   // set custom header id for testing
        //   "cognito-identity-id": user
        // }
      }
    );
    console.log(response);
    dispatch({
      type: ADD_EXPERIENCE_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADD_EXPERIENCE_FAIL,
      payload: err
    });
  }
};

// Edit Experience
export const editExperience = expData => async dispatch => {
  console.log(expData);

  try {
    await API.put(
      "teithe-career-portal-api",
      `/experiences/update/${expData.id}`,
      {
        body: expData
        // headers: {
        //   // set custom header id for testing
        //   "cognito-identity-id": user
        // }
      }
    );
    dispatch({
      type: EDIT_EXPERIENCE_SUCCESS,
      payload: expData
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: EDIT_EXPERIENCE_FAIL,
      payload: err
    });
  }
};

// Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    await API.del("teithe-career-portal-api", `/experiences/delete/${id}`);
    dispatch({
      type: DELETE_EXPERIENCE_SUCCESS,
      payload: id
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_EXPERIENCE_FAIL,
      payload: err
    });
  }
};

// // Add Education
// export const addEducation = eduData => async dispatch => {
//   console.log(eduData);

//   try {
//     await API.post("teithe-career-portal-api", `/educations`, {
//       body: eduData
//       // headers: {
//       //   // set custom header id for testing
//       //   "cognito-identity-id": user
//       // }
//     });
//   } catch (err) {
//     console.log(err);
//     // dispatch({
//     //   type: CREATE_PROFILE_FAIL,
//     //   payload: err
//     // });
//   }
// };

// // Edit Education
// export const editEducation = eduData => async dispatch => {
//   console.log(eduData);

//   try {
//     await API.put("teithe-career-portal-api", `/educations/${eduData.id}`, {
//       body: eduData
//       // headers: {
//       //   // set custom header id for testing
//       //   "cognito-identity-id": user
//       // }
//     });
//   } catch (err) {
//     console.log(err);
//     // dispatch({
//     //   type: CREATE_PROFILE_FAIL,
//     //   payload: err
//     // });
//   }
// };

// Add Education
export const addEducation = eduData => async dispatch => {
  console.log(eduData);

  try {
    const response = await API.post("teithe-career-portal-api", `/educations`, {
      body: eduData
      // headers: {
      //   // set custom header id for testing
      //   "cognito-identity-id": user
      // }
    });
    console.log(response);
    dispatch({
      type: ADD_EDUCATION_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADD_EDUCATION_FAIL,
      payload: err
    });
  }
};

// Edit Education
export const editEducation = eduData => async dispatch => {
  console.log(eduData);

  try {
    await API.put(
      "teithe-career-portal-api",
      `/educations/update/${eduData.id}`,
      {
        body: eduData
        // headers: {
        //   // set custom header id for testing
        //   "cognito-identity-id": user
        // }
      }
    );
    dispatch({
      type: EDIT_EDUCATION_SUCCESS,
      payload: eduData
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: EDIT_EDUCATION_FAIL,
      payload: err
    });
  }
};

// Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    await API.del("teithe-career-portal-api", `/educations/delete/${id}`);
    dispatch({
      type: DELETE_EDUCATION_SUCCESS,
      payload: id
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_EDUCATION_FAIL,
      payload: err
    });
  }
};
