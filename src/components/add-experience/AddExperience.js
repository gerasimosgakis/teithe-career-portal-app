import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../shared/TextFieldGroup";
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";
import InputGroup from "../shared/InputGroup";
import SelectListGroup from "../shared/SelectListGroup";
class AddExperience extends Component {
  constructor(props) {
    super(props);

    // Retrieve all the props and save them in variables
    const {
      id,
      current,
      _location,
      description,
      title,
      start_date,
      end_date,
      company,
      currentExperienceIndex
    } = this.props;

    // Initialise state with the received props
    this.state = {
      id,
      current,
      _location,
      description,
      title,
      start_date,
      end_date,
      company: company,
      currentExperienceIndex
    };
  }

  /** Get Derived State From Props method
   *  We use this method so we can update the data in the form every time we choose a
   *  different experience to edit
   */
  static getDerivedStateFromProps(props, current_state) {
    if (props.currentExperienceIndex === null) {
      return {
        id: "",
        current: "",
        _location: "",
        description: "",
        title: "",
        start_date: "",
        end_date: "",
        company: "",
        currentExperienceIndex: ""
      };
    } else if (
      props.currentExperienceIndex !== current_state.currentExperienceIndex
    ) {
      // Check if we are using a different experience and update state if we do
      return {
        id: props.id,
        current: props.current,
        _location: props._location !== null ? props._location : null,
        description: props.description,
        title: props.title,
        start_date: props.start_date,
        end_date: props.end_date,
        company: props.company,
        currentExperienceIndex: props.currentExperienceIndex
      };
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {/* <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link> */}
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state._location}
                  onChange={this.onChange}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  placeholder="from"
                  name="from"
                  type="month"
                  value={this.state.from}
                  onChange={this.onChange}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  placeholder="to"
                  name="to"
                  type="month"
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  info="Tell us about your position"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   profiles: state.profiles
// });

export default connect(
  null,
  {}
)(withRouter(AddExperience));

// import React from "react";
// import TextFieldGroup from "../shared/TextFieldGroup";
// import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";
// import InputGroup from "../shared/InputGroup";
// import SelectListGroup from "../shared/SelectListGroup";

// const AddExperience = ({
//   current,
//   location,
//   description,
//   title,
//   start_date,
//   end_date,
//   company
// }) => {
//   return (
//     <div className="create-profile">
//       <div className="create-profile__header">
//         <h1>Create Your Profile</h1>
//         <p className="header-label">
//           Let's get some information to make your profile stand out
//         </p>
//       </div>
//       <div className="create-profile__form">
//         <small className="small-text">* = required fields</small>
//         <form className="mt1">
//           {/* <TextFieldGroup
//             placeholder="* Profile Handle"
//             name="handle"
//             value={this.state.handle}
//             required
//             onChange={this.onChange}
//             info="A unique handle for your profile URL. Your full name, company name. nickname"
//           /> */}
//           {/* <SelectListGroup
//             placeholder="Status"
//             name="status"
//             value={this.state.status}
//             options={options}
//             onChange={this.onChange}
//             info="Where are you at in your career"
//           /> */}
//           <TextFieldGroup
//             placeholder="Company"
//             name="company"
//             value={company}
//             info="Your own company or the one you work for"
//           />
//           {/* <TextFieldGroup
//             placeholder="Website"
//             name="website"
//             value={this.state.website}
//             onChange={this.onChange}
//             info="Your website or a company one"
//           /> */}
//           {/* <TextFieldGroup
//             placeholder="Location"
//             name="location"
//             value={this.state.location}
//             onChange={this.onChange}
//             info="Your location (e.g. London, UK)"
//           />
//           <TextFieldGroup
//             placeholder="Skills"
//             name="skills"
//             value={this.state.skills}
//             onChange={this.onChange}
//             info="Please use comma separated values (e.g. Javascript,Angular,React)"
//           />
//           <TextFieldGroup
//             placeholder="Github Username"
//             name="githubusername"
//             value={this.state.githubusername}
//             onChange={this.onChange}
//             info="If you want your latest repos and a Github link include your username"
//           />
//           <TextAreaFieldGroup
//             placeholder="Short Bio"
//             name="bio"
//             value={this.state.bio}
//             onChange={this.onChange}
//             info="Let us know a little more about yourself"
//           /> */}

//           <input
//             type="submit"
//             value="Submit"
//             className="btn btn-info btn-block mt-4"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddExperience;
