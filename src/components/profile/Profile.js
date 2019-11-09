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

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
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
    }
    // else if (!profile.id) {
    //   // if the user has not added profile info
    //   this.props.history.push("create-profile");
    // }
    else {
      profileContent = (
        <div>
          <ProfileHeader
            profile={profile}
            edit={profile.id === user.username}
          />
          <ProfileAbout profile={profile} />
          <ProfileCreds
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

export default connect(
  mapStateToProps,
  { getProfileByHandle, getProfileById, deleteExperience }
)(Profile);
