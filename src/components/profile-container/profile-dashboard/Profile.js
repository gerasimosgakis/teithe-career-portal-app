import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileSkills from "./ProfileSkills";
import Spinner from "../../shared/Spinner";
import {
  getProfileByHandle,
  getProfileById,
  deleteExperience,
  clearSuccess
} from "../../../redux/actions/profileActions";
import CreateProfile from "../create-profile/CreateProfile";
import AddEducation from "../add-education/AddEducation";
import AddExperience from "../add-experience/AddExperience";

class Profile extends Component {
  componentDidMount = async () => {
    if (this.props.match.params.id) {
      // If there is an id in the url parameters, retrieve the profile using that
      this.props.getProfileById(this.props.match.params.id);
    } else {
      // Otherwise get the id from the auth store (it means it is the current user's profile)
      this.props.getProfileById(this.props.auth.user.username);
    }
  };

  /**
   * It is called when the modal is opened and it sets success to false so the status icon won't be shown
   */
  onModalOpen = () => {
    this.props.clearSuccess();
  };

  render() {
    const { profile, loading } = this.props; // Gets the profile from props
    const { user } = this.props.auth; // Gets user from props.auth
    let profileContent;

    if (profile === null || loading) {
      // If there is no profile or loading is true, show spinner
      profileContent = <Spinner />;
    } else if (profile && !profile.name) {
      // If there a profile object but not a name, it means the user has nott created a profile yet
      profileContent = <CreateProfile header={true}></CreateProfile>; // Render create profile form
    } else if (
      // If there is a profile but no educations and the user is not a recruiter
      profile &&
      profile.name &&
      profile.educations.length <= 0 &&
      this.props.auth.user.attributes["custom:role"] !== "recruiter"
    ) {
      profileContent = (
        <AddEducation userId={this.props.auth.user.username}></AddEducation> // Render add education form
      );
    } else if (
      profile &&
      profile.name &&
      profile.educations.length > 0 &&
      profile.experiences.length <= 0 &&
      this.props.auth.user.attributes["custom:role"] !== "recruiter" // If there is a profile and an education and the user is not a recruiter
    ) {
      profileContent = (
        <AddExperience userId={this.props.auth.user.username}></AddExperience> // Render the add experience form
      );
    } else {
      // Else Render the profile information
      profileContent = (
        <div>
          <ProfileHeader
            profile={profile}
            user={user}
            edit={profile.id === user.username}
            onModalOpen={() => this.onModalOpen()}
          />
          <ProfileAbout profile={profile} />
          {user.attributes["custom:role"] !== "recruiter" && (
            <ProfileCreds
              success={profile.success}
              userId={user.username}
              education={profile.educations}
              experience={profile.experiences}
              edit={profile.id === user.username}
              onModalOpen={() => this.onModalOpen()}
            />
          )}
          {user.attributes["custom:role"] !== "recruiter" && (
            <ProfileSkills profile={profile} />
          )}
          {profile.githubusername &&
          user.attributes["custom:role"] !== "recruiter" ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return <div>{profileContent}</div>;
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  // profiles: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // profiles: state.profiles,
  loading: state.profiles.loading,
  profile: state.profiles.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProfileByHandle,
  getProfileById,
  deleteExperience,
  clearSuccess
})(Profile);
