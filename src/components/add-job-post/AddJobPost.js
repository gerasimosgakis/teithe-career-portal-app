import React, { Component } from "react";
import TextFieldGroup from "../shared/TextFieldGroup";
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";

export default class AddJobPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      recruiter: "",
      minSalary: null,
      maxSalary: null,
      description: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h1 className="display-4 text-center">Add Job Post</h1>
        <div className="create-profile__form">
          <small className="small-text">* = required fields</small>
          <form className="mt1" onSubmit={this.onSubmit}>
            <div className="form__field-label">* Title</div>
            <TextFieldGroup
              placeholder="* Title"
              name="title"
              value={this.state.title}
              required
              onChange={this.onChange}
            />
            <div className="form__field-label">* Recruiter</div>
            <TextFieldGroup
              placeholder="* Recruiter"
              name="recruiter"
              value={this.state.recruiter}
              required
              onChange={this.onChange}
            />
            <div className="form__field-label">Minimum Salary</div>
            <TextFieldGroup
              placeholder="Minimum Salary"
              name="minSalary"
              value={this.state.minSalary}
              required
              type="number"
              onChange={this.onChange}
            />
            <div className="form__field-label">Maximum Salary</div>
            <TextFieldGroup
              placeholder="Maximum Salary"
              name="maxSalary"
              value={this.state.maxSalary}
              required
              type="number"
              onChange={this.onChange}
            />
            <div className="form__field-label">Description</div>
            <TextAreaFieldGroup
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            />
            {/* <TextFieldGroup
              placeholder="* Profile Handle"
              name="handle"
              value={this.state.handle}
              required
              onChange={this.onChange}
              info="A unique handle for your profile URL. Your full name, company name. nickname"
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
            /> */}

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
