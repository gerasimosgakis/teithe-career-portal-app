import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileSkills from "./ProfileSkills";
import Spinner from "../shared/Spinner";
import {
  getProfileByHandle,
  getProfileById,
  deleteExperience
} from "../../redux/actions/profileActions";
import CreateProfile from "../create-profile/CreateProfile";
import AddEducation from "../add-education/AddEducation";
import AddExperience from "../add-experience/AddExperience";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    } else {
      this.props.getProfileById(this.props.auth.user.username);
    }
  }

  render() {
    const { profile, loading } = this.props.profiles;
    const { user } = this.props.auth;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else if (profile && !profile.name) {
      profileContent = <CreateProfile></CreateProfile>;
    } else if (profile && profile.name && profile.educations.length <= 0) {
      profileContent = (
        <AddEducation userId={this.props.auth.user.username}></AddEducation>
      );
    } else if (
      profile &&
      profile.name &&
      profile.educations.length > 0 &&
      profile.experiences.length <= 0
    ) {
      profileContent = (
        <AddExperience userId={this.props.auth.user.username}></AddExperience>
      );
    } else {
      profileContent = (
        <div>
          <ProfileHeader
            profile={profile}
            edit={profile.id === user.username}
          />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            userId={user.username}
            education={profile.educations}
            experience={profile.experiences}
            edit={profile.id === user.username}
          />
          <ProfileSkills profile={profile} />
          {profile.githubusername ? (
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
  profiles: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profiles: state.profiles,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getProfileByHandle,
  getProfileById,
  deleteExperience
})(Profile);
