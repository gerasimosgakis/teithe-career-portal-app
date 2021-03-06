import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import titleCase from "../../../shared/functions/titleCase";
import ReactTooltip from "react-tooltip";
import { getCV } from "../../../shared/functions/aws";
import isEmpty from "../../../shared/functions/isEmpty";
import Avatar from "react-avatar";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="profile__item-content mb2">
        {/* React tooltip package import - Needed for adding tooltips in the component */}
        <ReactTooltip></ReactTooltip>
        <div className="profile__item-content__image-container">
          <Avatar
            email={profile.email}
            name={profile.name}
            round={true}
            size="100"
          />
        </div>
        <div className="profile__item-content__title-container">
          <h2>{titleCase(profile.name)}</h2>
          <p className="help-text">
            {titleCase(profile.status)}{" "}
            {isEmpty(profile.company) ? null : (
              <span>at {titleCase(profile.company)}</span>
            )}
          </p>
        </div>
        <div className="profile__item-content__skills-container">
          {profile.skills
            .split(",")
            .slice(0, 2)
            .map((skill, index) => (
              <span key={index} className="mr1">
                <i className="fa fa-check pr-1" />
                {skill}
              </span>
            ))}
          {profile.skills.split(",").length > 2 && (
            <span data-tip={profile.skills}>...</span>
          )}
        </div>
        <div className="profile__item-content__cv-container mt2">
          {profile.cv_name && (
            <div>
              <button
                className="icon-button icon-button--small"
                onClick={() => getCV(profile.cv_url)}
              >
                <i className="fas fa-download"></i> Download CV
              </button>
            </div>
          )}
        </div>
        <div className="profile__item-content__button-container">
          <Link
            to={`/graduates/${profile.id}`}
            className="profile__item-content__button-container-button button button--small transparent-btn"
          >
            Visit
          </Link>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
