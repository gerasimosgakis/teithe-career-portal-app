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
  SEARCH_GRADUATES_FAIL,
  ADD_CV_FAIL,
  ADD_CV_SUCCESS,
  SET_LOADING,
  CLEAR_SUCCESS
} from "./types";

/**
 * Gets All Profiles
 */
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

/**
 * Gets Profile By Id
 * @param {*} id - Profile id
 */
export const getProfileById = id => async dispatch => {
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

// /**
//  * Gets profile by handle
//  * @param {*} handle
//  */
// export const getProfileByHandle = handle => async dispatch => {
//   try {
//     dispatch({
//       type: "SET_LOADING",
//       payload: true
//     });
//     const profile = await API.get(
//       "teithe-career-portal-api",
//       `/profiles/handle/${handle}`
//     );
//     const educations = await API.get(
//       "teithe-career-portal-api",
//       `/educations/${profile[0].id}`
//     );
//     const experiences = await API.get(
//       "teithe-career-portal-api",
//       `/experiences/${profile[0].id}`
//     );

//     dispatch({
//       type: GET_PROFILE_SUCCESS,
//       payload: {
//         profile: profile[0],
//         educations,
//         experiences
//       }
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_PROFILE_FAIL,
//       payload: error
//     });
//   }
// };

/**
 * Searches Graduates
 * @param {*} params - Search Params
 */
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
    dispatch({
      type: SEARCH_GRADUATES_FAIL,
      payload: err
    });
  }
};

/**
 * Creates Profile
 * @param {*} user
 * @param {*} email
 * @param {*} profileData
 */
export const createProfile = (user, email, profileData) => async dispatch => {
  profileData.id = user;
  const avatar = gravatar.url(email, {
    s: "300", // size
    r: "pg", // rating
    d: "mm" //default
  });
  profileData.avatar = avatar;
  try {
    const result = await API.post("teithe-career-portal-api", `/profiles`, {
      body: profileData
    });
    dispatch({
      type: CREATE_PROFILE_SUCCESS,
      payload: { profile: result.data }
    });
  } catch (err) {
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload: err
    });
  }
};

/**
 * Edits Profile
 * @param {*} user
 * @param {*} email
 * @param {*} profileData
 */
export const editProfile = (user, email, profileData) => async dispatch => {
  profileData.id = user;
  const avatar = gravatar.url(email, {
    s: "300", // size
    r: "pg", // rating
    d: "mm" //default
  });
  profileData.avatar = avatar;
  try {
    const editProfileResponse = await API.put(
      "teithe-career-portal-api",
      `/profiles/${profileData.id}`,
      {
        body: profileData
      }
    );
    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: editProfileResponse
    });
  } catch (err) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: err
    });
  }
};

/**
 * Adds Experience
 * @param {*} expData
 */
export const addExperience = expData => async dispatch => {
  try {
    const response = await API.post(
      "teithe-career-portal-api",
      `/experiences`,
      {
        body: expData
      }
    );
    dispatch({
      type: ADD_EXPERIENCE_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: ADD_EXPERIENCE_FAIL,
      payload: err
    });
  }
};

/**
 * Edits Experience
 * @param {*} expData
 */
export const editExperience = expData => async dispatch => {
  try {
    await API.put(
      "teithe-career-portal-api",
      `/experiences/update/${expData.id}`,
      {
        body: expData
      }
    );
    dispatch({
      type: EDIT_EXPERIENCE_SUCCESS,
      payload: expData
    });
  } catch (err) {
    dispatch({
      type: EDIT_EXPERIENCE_FAIL,
      payload: err
    });
  }
};

/**
 * Deletes Experience
 * @param {*} id - Experience id
 */
export const deleteExperience = id => async dispatch => {
  try {
    await API.del("teithe-career-portal-api", `/experiences/delete/${id}`);
    dispatch({
      type: DELETE_EXPERIENCE_SUCCESS,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: DELETE_EXPERIENCE_FAIL,
      payload: err
    });
  }
};

/**
 * Adds Education
 * @param {*} eduData
 */
export const addEducation = eduData => async dispatch => {
  try {
    const response = await API.post("teithe-career-portal-api", `/educations`, {
      body: eduData
    });
    dispatch({
      type: ADD_EDUCATION_SUCCESS,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: ADD_EDUCATION_FAIL,
      payload: err
    });
  }
};

/**
 * Edits Education
 * @param {*} eduData
 */
export const editEducation = eduData => async dispatch => {
  try {
    await API.put(
      "teithe-career-portal-api",
      `/educations/update/${eduData.id}`,
      {
        body: eduData
      }
    );
    dispatch({
      type: EDIT_EDUCATION_SUCCESS,
      payload: eduData
    });
  } catch (err) {
    dispatch({
      type: EDIT_EDUCATION_FAIL,
      payload: err
    });
  }
};

/**
 * Deletes Education
 * @param {*} id - Education id
 */
export const deleteEducation = id => async dispatch => {
  try {
    await API.del("teithe-career-portal-api", `/educations/delete/${id}`);
    dispatch({
      type: DELETE_EDUCATION_SUCCESS,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: DELETE_EDUCATION_FAIL,
      payload: err
    });
  }
};

/**
 * Saves cv url
 * @param {*} user
 * @param {*} cvName
 * @param {*} cvURL
 */
export const addCVToProfile = (user, cvName, cvURL) => async dispatch => {
  try {
    const response = await API.put(
      "teithe-career-portal-api",
      `/add-cv/${user}`,
      {
        body: { cv_name: cvName, cv_url: cvURL }
      }
    );
    dispatch({
      type: ADD_CV_SUCCESS,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: ADD_CV_FAIL,
      payload: error
    });
  }
};

export const clearSuccess = () => dispatch => {
  dispatch({
    type: CLEAR_SUCCESS
  });
};
