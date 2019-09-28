import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/isEmpty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3 profile-item">
        <div className="row text-center">
          <div className="col-lg-3 col-md-4 col-sm-5 col-12 profile-item__image-container">
            <img
              src={profile.avatar}
              alt="avatar"
              className="rounded-circle profile-item__image-container-image"
            />
          </div>
          <div className="col-lg-4 col-md-4 col-sm-5 col-12">
            <h3>{profile.handle}</h3>
            <p>
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link
              to={`/profiles-by-handle/${profile.handle}`}
              className="btn btn-info"
            >
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills
                .split(",")
                .slice(0, 4)
                .map((skill, index) => (
                  <li key={index} className="list-group-item">
                    <i className="fa fa-check pr-1" />
                    {skill}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
