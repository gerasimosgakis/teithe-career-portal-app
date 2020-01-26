import React, { Component } from "react";
import PropTypes from "prop-types";
import CreateProfile from "../create-profile/CreateProfile";
import titleCase from "../../../shared/functions/titleCase";
import isEmpty from "../../../shared/functions/isEmpty";
import Avatar from "react-avatar";
import SuccessIcon from "../../shared/SuccessIcon";
import { getCV } from "../../../shared/functions/aws";
import ErrorIcon from "../../shared/ErrorIcon";
class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    let modalBodyContent; // Edit profile modal body content
    if (profile.success) {
      modalBodyContent = (
        <SuccessIcon text="The profile has been successfully edited" />
      );
    } else if (profile.fail) {
      modalBodyContent = (
        <ErrorIcon text="The profile has not been edited. Please try again" />
      );
    } else {
      modalBodyContent = <CreateProfile header={true} small={true} />;
    }
    return (
      <div className="profile-header">
        <div className="profile-header__banner">
          {profile.cv_name && (
            <div>
              <button
                className="btn submit-btn profile-header__banner-button"
                onClick={() => getCV(profile.cv_url)}
              >
                <i className="fas fa-download"></i> Download CV
              </button>
            </div>
          )}
        </div>
        <div className="profile-header__logo">
          <Avatar
            email={profile.email}
            name={profile.name}
            round={true}
            size="200"
          />
        </div>
        <div className="contain">
          <div className="profile-header__heading">
            <div className="d-flex justify-space-between">
              <h2 className="bolded">{titleCase(profile.name)}</h2>
              {this.props.edit && (
                <button
                  className="btn transparent-btn"
                  data-toggle="modal"
                  data-target="#profileModal"
                  onClick={() => {
                    this.props.onModalOpen();
                  }}
                >
                  <i className="fas fa-edit"></i> Edit Profile
                </button>
              )}
            </div>
            <h4 className="lead-text mb3">
              {titleCase(profile.status)}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {titleCase(profile.company)}</span>
              )}
            </h4>
            <div className="d-flex justify-space-between mb3">
              <div>
                {isEmpty(profile.location) ? null : (
                  <p className="lead help-text">
                    {titleCase(profile.location)}
                  </p>
                )}
                {isEmpty(profile.phone) ? null : (
                  <p className="help-text">
                    <i className="fas fa-phone mr1"></i> {profile.phone}
                  </p>
                )}
                {isEmpty(profile.email) ? null : (
                  <p className="help-text">
                    <a
                      className="pr2 help-text"
                      href={`mailto:${profile.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-at mr1"></i> {profile.email}
                    </a>
                  </p>
                )}
                <p>
                  {isEmpty(profile.website) ? null : (
                    <a
                      className="pr2"
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-globe fa-2x" />
                    </a>
                  )}
                  {isEmpty(profile.twitter) ? null : (
                    <a
                      className="pr2"
                      href={profile.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter fa-2x" />
                    </a>
                  )}
                  {isEmpty(profile.facebook) ? null : (
                    <a
                      className="pr2"
                      href={profile.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook fa-2x" />
                    </a>
                  )}
                  {isEmpty(profile.linkedin) ? null : (
                    <a
                      className="pr2"
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin fa-2x" />
                    </a>
                  )}
                  {isEmpty(profile.instagram) ? null : (
                    <a
                      className="pr2"
                      href={profile.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram fa-2x" />
                    </a>
                  )}
                  {isEmpty(profile.youtube) ? null : (
                    <a
                      className="pr2"
                      href={profile.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube fa-2x" />
                    </a>
                  )}
                </p>
              </div>
              <div className="help-text">
                <div className="mb1">
                  <i className="fas fa-graduation-cap fa-1x mr1" />
                  {titleCase(profile.educations[0].school)}
                </div>
                <div>
                  <i className="fa fa-briefcase fa-1x mr1" />
                  &nbsp;{titleCase(profile.experiences[0].company)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit Modal */}
        <div className="modal fade" id="profileModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Profile</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">{modalBodyContent}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* / Profile Edit Modal */}
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired,
  getCV: PropTypes.func
};

export default ProfileHeader;
