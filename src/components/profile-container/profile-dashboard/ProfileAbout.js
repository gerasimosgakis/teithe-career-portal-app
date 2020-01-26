import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import isEmpty from "../../../shared/functions/isEmpty";
class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name from name
    const firstName = profile.name.trim().split(" ")[0];

    return (
      <div className="profile-about contain mb-2">
        <p className="lead">
          {isEmpty(profile.bio) ? (
            <span>{firstName} does not have a bio</span>
          ) : (
            <span className="profile-about__bio">{profile.bio}</span>
          )}
        </p>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default withRouter(ProfileAbout);
