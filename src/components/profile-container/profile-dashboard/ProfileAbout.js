import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCV } from "../../../shared/functions/aws";
import { withRouter } from "react-router-dom";
import isEmpty from "../../../shared/functions/isEmpty";
class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name from name
    const firstName = profile.name.trim().split(" ")[0];

    return (
      <div className="profile-about contain">
        <p className="lead">
          {isEmpty(profile.bio) ? (
            <span>{firstName} does not have a bio</span>
          ) : (
            <span className="profile-about__bio">{profile.bio}</span>
          )}
        </p>
        {/* {profile.cv_name && (
          <div>
            <button
              className="btn transparent-btn"
              onClick={() => getCV(profile.cv_url)}
            >
              <i className="fas fa-download"></i> Download CV
            </button>
          </div>
        )} */}
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default withRouter(ProfileAbout);
