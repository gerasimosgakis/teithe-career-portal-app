import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/isEmpty";
import titleCase from "../../shared/functions/titleCase";

class ProfileSkills extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.name.trim().split(" ")[0];

    // Skill List
    const skills = profile.skills.split(",").map((skill, index) => (
      <div key={index} className="profile-skills__content-skills-skill">
        <span className="profile-skills__content-skills-skill--bordered">
          {titleCase(skill)}
        </span>
      </div>
    ));

    return (
      <div className="profile-skills contain">
        <h3>Skills</h3>
        <div className="profile-skills__content">
          <div className="profile-skills__content-icon">
            <i className="fas fa-tools fa-3x" />
          </div>
          {isEmpty(profile.skills) ? (
            <span>{titleCase(firstName)} hasn't yet added any skills</span>
          ) : (
            <div className="profile-skills__content-skills">{skills}</div>
          )}
        </div>
      </div>
    );
  }
}

ProfileSkills.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileSkills;
