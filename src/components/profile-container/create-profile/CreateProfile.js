import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../../shared/TextFieldGroup";
import TextAreaFieldGroup from "../../shared/TextAreaFieldGroup";
import InputGroup from "../../shared/InputGroup";
import SelectListGroup from "../../shared/SelectListGroup";
import {
  createProfile,
  editProfile
} from "../../../redux/actions/profileActions";
import webify from "../../../shared/functions/webify";

class CreateProfile extends Component {
  edit =
    this.props.profiles.profile && this.props.profiles.profile.name
      ? true
      : false; // Variable we use so we know if we are editing an existing profile or creating a new one
  constructor(props) {
    super(props);

    const { profile } = this.props.profiles;

    this.state = {
      displaySocialInputs: false,
      handle: profile && profile.handle ? profile.handle : "",
      company: profile && profile.company ? profile.company : "",
      website: profile && profile.website ? profile.website : "",
      location: profile && profile.location ? profile.location : "",
      phone: profile && profile.phone ? profile.phone : "",
      email: profile && profile.email ? profile.email : "",
      status: profile && profile.status ? profile.status : "",
      skills: profile && profile.skills ? profile.skills : "",
      githubusername:
        profile && profile.githubusername ? profile.githubusername : "",
      bio: profile && profile.bio ? profile.bio : "",
      twitter: profile && profile.twitter ? profile.twitter : "",
      facebook: profile && profile.facebook ? profile.facebook : "",
      linkedin: profile && profile.linkedin ? profile.linkedin : "",
      youtube: profile && profile.youtube ? profile.youtube : "",
      instagram: profile && profile.instagram ? profile.instagram : "",
      experiences: profile && profile.experiences ? profile.experiences : [],
      educations: profile && profile.educations ? profile.educations : [],
      errors: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      id: this.props.auth.user.username,
      handle: this.state.handle.toLowerCase(),
      name: this.props.auth.user.attributes.name.toLowerCase(),
      company: this.state.company.toLowerCase(),
      website: webify(this.state.website),
      location: this.state.location.toLowerCase(),
      phone: this.state.phone.toLowerCase(),
      email: this.state.email.toLowerCase(),
      status: this.state.status.toLowerCase(),
      skills: this.state.skills.toLowerCase(),
      githubusername: this.state.githubusername.toLowerCase(),
      bio: this.state.bio,
      twitter: webify(this.state.twitter),
      facebook: webify(this.state.facebook),
      linkedin: webify(this.state.linkedin),
      youtube: webify(this.state.youtube),
      instagram: webify(this.state.instagram),
      type: this.props.auth.user.attributes["custom:role"]
    };

    const currentUserId = this.props.auth.user.username;
    const email = this.props.auth.user.attributes.email;

    this.edit
      ? this.props.editProfile(currentUserId, email, profileData)
      : this.props.createProfile(
          currentUserId,
          email,
          profileData,
          this.props.history
        );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
      { label: "Developer", value: "developer" },
      { label: "Junior Developer", value: "junior developer" },
      { label: "Senior Developer", value: "senior developer" },
      { label: "Manager", value: "manager" },
      { label: "Student / Learning", value: "student / learning" },
      { label: "Instructor / Teacher", value: "instructor / teacher" },
      { label: "Intern", value: "intern" },
      { label: "Other", value: "other" }
    ];
    return (
      <div className="create-profile">
        {this.props.header && (
          <div className="create-profile__header">
            <h1>Create Your Profile</h1>
            <p className="header-label">
              Let's get some information to make your profile stand out
            </p>
          </div>
        )}
        <h1 className="display-4 text-center">Profile</h1>
        <div className="create-profile__form">
          <small className="small-text">* = required fields</small>
          <form className="mt1" onSubmit={this.onSubmit}>
            <div className="form__field-label">Handle</div>
            <TextFieldGroup
              placeholder="* Profile Handle"
              name="handle"
              value={this.state.handle}
              required
              onChange={this.onChange}
              info="A unique handle for your profile URL. Your full name, company name. nickname"
            />
            <div className="form__field-label">Professional Status</div>
            <SelectListGroup
              placeholder="Status"
              name="status"
              value={this.state.status}
              options={options}
              onChange={this.onChange}
              info="Where are you at in your career"
            />
            <div className="form__field-label">Company</div>
            <TextFieldGroup
              placeholder="Company"
              name="company"
              value={this.state.company}
              onChange={this.onChange}
              info="Your own company or the one you work for"
            />
            <div className="form__field-label">Website</div>
            <TextFieldGroup
              placeholder="Website"
              name="website"
              value={this.state.website}
              onChange={this.onChange}
              info="Your website or a company one"
            />
            <div className="form__field-label">Location</div>
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              info="Your location (e.g. London, UK)"
            />
            <div className="form__field-label">Phone Number</div>
            <TextFieldGroup
              placeholder="Phone Number"
              name="phone"
              value={this.state.phone}
              onChange={this.onChange}
              info="Your phone number"
            />
            <div className="form__field-label">Email Address</div>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              info="Your email address"
            />
            <div className="form__field-label">Skills</div>
            <TextFieldGroup
              placeholder="Skills"
              name="skills"
              value={this.state.skills}
              onChange={this.onChange}
              info="Please use comma separated values (e.g. Javascript,Angular,React)"
            />
            <div className="form__field-label">Github Username</div>
            <TextFieldGroup
              placeholder="Github Username"
              name="githubusername"
              value={this.state.githubusername}
              onChange={this.onChange}
              info="If you want your latest repos and a Github link include your username"
            />
            <div className="form__field-label">Short Bio</div>
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
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    header: ownProps.header,
    auth: state.auth,
    profiles: state.profiles,
    errors: state.errors
  };
};

export default connect(mapStateToProps, { createProfile, editProfile })(
  withRouter(CreateProfile)
);
