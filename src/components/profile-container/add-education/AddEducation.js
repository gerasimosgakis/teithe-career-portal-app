import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../../shared/TextFieldGroup";
import TextAreaFieldGroup from "../../shared/TextAreaFieldGroup";
import moment from "moment";
import {
  addEducation,
  editEducation
} from "../../../redux/actions/profileActions";
import checkDate from "../../../shared/functions/checkDate";
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

    // Initialise state with the received props or fallback
    this.state = {
      user_id: userId ? userId : "",
      id: id ? id : "",
      current: current ? current : false,
      disabled: current ? true : false,
      school: school ? school : "",
      description: description ? description : "",
      degree: degree ? degree : "",
      start_date: checkDate(start_date),
      end_date: checkDate(end_date),
      fieldofstudy: fieldofstudy ? fieldofstudy : "",
      currentEducationIndex: currentEducationIndex ? currentEducationIndex : -1
    };
  }

  /** Get Derived State From Props method
   *  We use this method so we can update the data in the form every time we choose a
   *  different experience to edit
   */
  static getDerivedStateFromProps(props, current_state) {
    if (
      current_state.currentEducationIndex !== -1 &&
      props.currentEducationIndex < 0
    ) {
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
      };
    }
    if (
      props.currentEducationIndex !== -1 &&
      props.currentEducationIndex !== current_state.currentEducationIndex
    ) {
      // Check if we are using a different experience and update state if we do
      return {
        user_id: props.userId,
        id: props.id,
        current: props.current || false,
        disabled: props.current ? true : false,
        school: props.school !== null ? props.school : null,
        description: props.description,
        degree: props.degree,
        start_date: checkDate(props.start_date),
        end_date: props.current ? "" : checkDate(props.end_date),
        fieldofstudy: props.fieldofstudy,
        currentEducationIndex: props.currentEducationIndex
      };
    } else {
      return null;
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /**
   * On current checkbox check
   */
  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // Check if we are editing an education
    if (this.state.id && this.state.id !== "") {
      // call the edit function
      this.props.editEducation({
        user_id: this.state.user_id,
        id: this.state.id,
        current: this.state.current,
        school: this.state.school,
        description: this.state.description,
        degree: this.state.degree,
        start_date: moment(this.state.start_date).toDate(),
        end_date: this.state.current
          ? null
          : moment(this.state.end_date).toDate(),
        fieldofstudy: this.state.fieldofstudy
      });
    } else {
      // Otherwise call the add function
      this.props.addEducation({
        user_id: this.state.user_id,
        current: this.state.current,
        school: this.state.school,
        description: this.state.description,
        degree: this.state.degree,
        start_date: moment(this.state.start_date).toDate(),
        end_date: this.state.current
          ? null
          : moment(this.state.end_date).toDate(),
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
              <h1 className="display-4 text-center">Education</h1>
              <p className="lead text-center">
                Add any degree that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <div className="form__field-label">* School</div>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  required
                  value={this.state.school}
                  onChange={this.onChange}
                />
                <div className="form__field-label">* Degree</div>
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  required
                  value={this.state.degree}
                  onChange={this.onChange}
                />
                <div className="form__field-label">* Field of Study</div>
                <TextFieldGroup
                  placeholder="Field of Study"
                  name="fieldofstudy"
                  required
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                />
                <div className="form__field-label">* Start Date</div>
                <TextFieldGroup
                  placeholder="from"
                  name="start_date"
                  type="month"
                  required
                  value={this.state.start_date}
                  onChange={this.onChange}
                />
                <div className="form__field-label">* End Date</div>
                <TextFieldGroup
                  placeholder="to"
                  name="end_date"
                  type="month"
                  required
                  value={this.state.end_date}
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
                    id="currentEdu"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Degree
                  </label>
                </div>
                <div className="form__field-label">Description</div>
                <TextAreaFieldGroup
                  placeholder="Study Description"
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

export default connect(null, { addEducation, editEducation })(
  withRouter(AddEducation)
);
