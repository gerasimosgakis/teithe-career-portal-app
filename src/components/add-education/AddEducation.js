import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../shared/TextFieldGroup";
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";
import InputGroup from "../shared/InputGroup";
import SelectListGroup from "../shared/SelectListGroup";
import moment from "moment";
import {
  addEducation,
  editEducation
} from "../../redux/actions/profileActions";
class AddEducation extends Component {
  constructor(props) {
    super(props);

    // Retrieve all the props and save them in variables
    const {
      userId,
      id,
      current,
      school,
      description,
      degree,
      start_date,
      end_date,
      fieldofstudy,
      currentEducationIndex
    } = this.props;

    // Initialise state with the received props
    this.state = {
      user_id: userId,
      id,
      current,
      school,
      description,
      degree,
      start_date,
      end_date,
      fieldofstudy,
      currentEducationIndex
    };
  }

  /** Get Derived State From Props method
   *  We use this method so we can update the data in the form every time we choose a
   *  different experience to edit
   */
  static getDerivedStateFromProps(props, current_state) {
    if (
      current_state.currentEducationIndex !== -1 &&
      props.currentEducationIndex === null
    ) {
      console.log(props.currentEducationIndex);
      return {
        user_id: props.userId,
        id: "",
        current: false,
        school: "",
        description: "",
        degree: "",
        start_date: "",
        end_date: "",
        fieldofstudy: ""
        // currentExperienceIndex: null
      };
    }
    if (
      current_state.currentEducationIndex !== -1 &&
      props.currentEducationIndex !== current_state.currentEducationIndex
    ) {
      // Check if we are using a different experience and update state if we do
      return {
        user_id: props.userId,
        id: props.id,
        current: props.current || false,
        school: props.school !== null ? props.school : null,
        description: props.description,
        degree: props.degree,
        start_date: props.start_date,
        end_date: props.end_date,
        fieldofstudy: props.fieldofstudy,
        currentEducationIndex: props.currentEducationIndex
      };
    }
  }

  onChange = e => {
    console.log(e);
    this.setState({
      currentEducationIndex: -1,
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.id) {
      this.props.editEducation({
        user_id: this.state.user_id,
        id: this.state.id,
        current: this.state.current,
        school: this.state.school,
        description: this.state.description,
        degree: this.state.degree,
        start_date: moment(this.state.start_date),
        end_date: moment(this.state.end_date),
        // start_date: new Date(),
        // end_date: new Date(),
        fieldofstudy: this.state.fieldofstudy
      });
    } else {
      this.props.addEducation({
        user_id: this.state.user_id,
        current: this.state.current,
        school: this.state.school,
        description: this.state.description,
        degree: this.state.degree,
        start_date: moment(this.state.start_date),
        end_date: moment(this.state.end_date),
        // start_date: new Date(),
        // end_date: new Date(),
        fieldofstudy: this.state.fieldofstudy
      });
    }
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
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
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
                    onChange={this.onChange}
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
  { addEducation, editEducation }
)(withRouter(AddEducation));
