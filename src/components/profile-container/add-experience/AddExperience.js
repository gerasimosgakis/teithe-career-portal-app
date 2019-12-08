import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../../shared/TextFieldGroup";
import TextAreaFieldGroup from "../../shared/TextAreaFieldGroup";
import moment from "moment";
import {
  addExperience,
  editExperience
} from "../../../redux/actions/profileActions";
class AddExperience extends Component {
  constructor(props) {
    super(props);

    // Retrieve all the props and save them in variables
    const {
      userId,
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
      user_id: userId,
      id,
      current,
      disabled: current ? true : false,
      _location,
      description,
      title,
      start_date: start_date ? start_date.slice(0, 7) : null,
      end_date: end_date ? end_date.slice(0, 7) : null,
      company: company,
      currentExperienceIndex
    };
  }

  /** Get Derived State From Props method
   *  We use this method so we can update the data in the form every time we choose a
   *  different experience to edit
   */
  static getDerivedStateFromProps(props, current_state) {
    if (
      current_state.currentExperienceIndex !== -1 &&
      props.currentExperienceIndex < 0
    ) {
      return {
        user_id: props.userId,
        id: "",
        current: false,
        disabled: false,
        _location: "",
        description: "",
        title: "",
        start_date: "",
        end_date: "",
        company: ""
        // currentExperienceIndex: null
      };
    } else if (
      props.currentExperienceIndex !== -1 &&
      props.currentExperienceIndex !== current_state.currentExperienceIndex
    ) {
      // Check if we are using a different experience and update state if we do
      return {
        user_id: props.userId,
        id: props.id,
        current: props.current,
        disabled: props.current ? true : false,
        _location: props._location !== null ? props._location : null,
        description: props.description,
        title: props.title,
        start_date: props.start_date.slice(0, 7),
        end_date: props.current ? null : props.end_date.slice(0, 7),
        company: props.company,
        currentExperienceIndex: props.currentExperienceIndex
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

  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    if (this.state.id) {
      this.props.editExperience({
        user_id: this.state.user_id,
        id: this.state.id,
        current: this.state.current,
        location: this.state._location,
        description: this.state.description,
        title: this.state.title,
        start_date: moment(this.state.start_date).toDate(),
        end_date: this.state.current
          ? null
          : moment(this.state.end_date).toDate(),
        company: this.state.company
      });
    } else {
      this.props.addExperience({
        user_id: this.state.user_id,
        current: this.state.current,
        location: this.state._location,
        description: this.state.description,
        title: this.state.title,
        start_date: moment(this.state.start_date).toDate(),
        end_date: this.state.current
          ? null
          : moment(this.state.end_date).toDate(),
        company: this.state.company
      });
    }
  };

  render() {
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  required
                  value={this.state.company}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  required
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="_location"
                  required
                  value={this.state._location}
                  onChange={this.onChange}
                />
                <h6>* From Date</h6>
                <TextFieldGroup
                  placeholder="from"
                  name="start_date"
                  type="month"
                  required
                  value={this.state.start_date}
                  onChange={this.onChange}
                />
                <h6>* To Date</h6>
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

export default connect(null, { addExperience, editExperience })(
  withRouter(AddExperience)
);
