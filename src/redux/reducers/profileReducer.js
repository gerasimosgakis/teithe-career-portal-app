import {
  SET_LOADING,
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
  ADD_CV_SUCCESS,
  ADD_CV_FAIL
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
      console.log(action.payload);
      return {
        ...state,
        profile: {
          ...action.payload.profile,
          educations: [],
          experiences: []
        },
        loading: false
      };
    case CREATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: {
          ...action.payload.data,
          experiences: [...state.profile.experiences],
          educations: [...state.profile.educations]
        },
        loading: false
      };
    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case EDIT_EXPERIENCE_SUCCESS:
      const experiences = [...state.profile.experiences];
      const changedExpIndex = experiences.findIndex(item => {
        return item.id === action.payload.id;
      });
      experiences[changedExpIndex] = action.payload;
      return {
        ...state,
        profile: {
          ...state.profile,
          experiences
        },
        loading: false
      };
    case EDIT_EXPERIENCE_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          experiences: [...state.profile.experiences, action.payload]
        },
        loading: false
      };
    case ADD_EXPERIENCE_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case DELETE_EXPERIENCE_SUCCESS:
      const newExperiences = [...state.profile.experiences];
      const deletedExpIndex = state.profile.experiences.findIndex(item => {
        return item.id === action.payload;
      });

      newExperiences.splice(deletedExpIndex, 1);
      return {
        ...state,
        profile: {
          ...state.profile,
          experiences: newExperiences
        },
        loading: false
      };
    case DELETE_EXPERIENCE_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };

    case EDIT_EDUCATION_SUCCESS:
      const educations = [...state.profile.educations];
      const changedEduIndex = educations.findIndex(item => {
        return item.id === action.payload.id;
      });
      educations[changedEduIndex] = action.payload;
      return {
        ...state,
        profile: {
          ...state.profile,
          educations
        },
        loading: false
      };
    case EDIT_EDUCATION_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case ADD_EDUCATION_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          educations: [...state.profile.educations, action.payload]
        },
        loading: false
      };
    case ADD_EDUCATION_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case DELETE_EDUCATION_SUCCESS:
      const newEducations = [...state.profile.educations];
      const deletedEduIndex = state.profile.educations.findIndex(item => {
        return item.id === action.payload;
      });

      newEducations.splice(deletedEduIndex, 1);
      return {
        ...state,
        profile: {
          ...state.profile,
          educations: newEducations
        },
        loading: false
      };
    case DELETE_EDUCATION_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case SEARCH_GRADUATES_SUCCESS:
      return {
        ...state,
        profiles: action.payload.profiles
      };
    case ADD_CV_SUCCESS:
      const { cv_name, cv_url } = action.payload.cv;
      return {
        ...state,
        profile: {
          ...state.profile,
          cv_name,
          cv_url
        }
      };
    case ADD_CV_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    default:
      return state;
  }
}
