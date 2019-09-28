import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import ProfileGithub from "./ProfileGithub";
import ProfileSkills from "./ProfileSkills";
import Spinner from "../shared/Spinner";
import { getProfileByHandle } from "../../redux/actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, loading } = this.props.profiles;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.educations}
            experience={profile.experiences}
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
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profiles: state.profiles
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
