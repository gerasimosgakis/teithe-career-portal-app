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
      <div className="profile-item mb2">
        <ReactTooltip></ReactTooltip>
        <div className="profile-item__image-container">
          {/* <img
            src={profile.avatar}
            alt="avatar"
            className="rounded-circle profile-item__image-container-image"
          /> */}
          <Avatar
            email={profile.email}
            name={profile.name}
            round={true}
            size="100"
          />
        </div>
        <div className="profile-item__title-container">
          <h2>{titleCase(profile.name)}</h2>
          <p className="help-text">
            {titleCase(profile.status)}{" "}
            {isEmpty(profile.company) ? null : (
              <span>at {titleCase(profile.company)}</span>
            )}
          </p>
        </div>
        <div className="profile-item__skills-container">
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
        <div className="profile-item__cv-container mt2">
          {profile.cv_name && (
            <div>
              {/* <a href={profile.cv_url} target="_blank">
                <i className="fas fa-download"></i> Download CV
              </a> */}
              <button
                className="icon-button icon-button--small"
                onClick={() => getCV(profile.cv_url)}
              >
                <i className="fas fa-download"></i> Download CV
              </button>
            </div>
          )}
        </div>
        <div className="profile-item__button-container">
          <Link
            to={`/graduates/${profile.id}`}
            className="profile-item__button-container-button button button--small transparent-btn"
          >
            Visit
          </Link>
          {/* <Link to={`/graduates/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link> */}
        </div>
      </div>

      // <div className="card card-body bg-light mb-3 profile-item">
      //   <div className="row text-center">
      //     <div className="col-lg-3 col-md-4 col-sm-5 col-12 profile-item__image-container">
      //       <img
      //         src={profile.avatar}
      //         alt="avatar"
      //         className="rounded-circle profile-item__image-container-image"
      //       />
      //     </div>
      //     <div className="col-lg-4 col-md-4 col-sm-5 col-12">
      //       <h3>{profile.handle}</h3>
      //       <p>
      //         {profile.status}{" "}
      //         {isEmpty(profile.company) ? null : (
      //           <span>at {profile.company}</span>
      //         )}
      //       </p>
      //       <p>
      //         {isEmpty(profile.location) ? null : (
      //           <span>{profile.location}</span>
      //         )}
      //       </p>
      //       <Link to={`/graduates/${profile.handle}`} className="btn btn-info">
      //         View Profile
      //       </Link>
      //     </div>
      //     <div className="col-md-4 d-none d-md-block">
      //       <h4>Skill Set</h4>
      //       <ul className="list-group">
      //         {profile.skills
      //           .split(",")
      //           .slice(0, 4)
      //           .map((skill, index) => (
      //             <li key={index} className="list-group-item">
      //               <i className="fa fa-check pr-1" />
      //               {skill}
      //             </li>
      //           ))}
      //       </ul>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
