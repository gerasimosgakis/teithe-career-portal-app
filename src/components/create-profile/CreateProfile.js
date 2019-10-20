import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../shared/TextFieldGroup";
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";
import InputGroup from "../shared/InputGroup";
import SelectListGroup from "../shared/SelectListGroup";
// import { createProfile } from "../../redux/actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {}
    };
  }

  render() {
    const { displaySocialInputs } = this.state;
    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile Url"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Facebook Profile Url"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Linkedin Profile Url"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Youtube Profile Url"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Instagram Profile Url"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
          />
        </div>
      );
    }
    // Select options for status
    const options = [
      { label: "Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student / Learning", value: "Student / Learning" },
      { label: "Instructor / Teacher", value: "Instructor / Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];
    return (
      <div className="create-profile">
        <div className="create-profile__header">
          <h1>Create Your Profile</h1>
          <p className="header-label">
            Let's get some information to make your profile stand out
          </p>
        </div>
        <div className="create-profile__form">
          <small className="small-text">* = required fields</small>
          <form className="mt1" onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Profile Handle"
              name="handle"
              value={this.state.handle}
              required
              onChange={this.onChange}
              info="A unique handle for your profile URL. Your full name, company name. nickname"
            />
            <SelectListGroup
              placeholder="Status"
              name="status"
              value={this.state.status}
              options={options}
              onChange={this.onChange}
              info="Where are you at in your career"
            />
            <TextFieldGroup
              placeholder="Company"
              name="company"
              value={this.state.company}
              onChange={this.onChange}
              info="Your own company or the one you work for"
            />
            <TextFieldGroup
              placeholder="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              info="Your website or a company one"
            />
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              info="Your location (e.g. London, UK)"
            />
            <TextFieldGroup
              placeholder="Skills"
              name="skills"
              value={this.state.skills}
              onChange={this.onChange}
              info="Please use comma separated values (e.g. Javascript,Angular,React)"
            />
            <TextFieldGroup
              placeholder="Github Username"
              name="githubusername"
              value={this.state.githubusername}
              onChange={this.onChange}
              info="If you want your latest repos and a Github link include your username"
            />
            <TextAreaFieldGroup
              placeholder="Short Bio"
              name="bio"
              value={this.state.bio}
              onChange={this.onChange}
              info="Let us know a little more about yourself"
            />

            <div className="mb-3">
              <button
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                  }));
                }}
                className="btn btn-light"
              >
                Add Social Network Links
              </button>
              <span className="text-muted">Optional</span>
            </div>
            {socialInputs}
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(CreateProfile));
