import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addInternalJob,
  editInternalJob
} from "../../../redux/actions/internalJobActions";
import TextFieldGroup from "../../shared/TextFieldGroup";
import TextAreaFieldGroup from "../../shared/TextAreaFieldGroup";
import SelectListGroup from "../../shared/SelectListGroup";

class AddJobPostForm extends Component {
  defaultState = {
    title: "",
    recruiter: "",
    location: "",
    type: "",
    min_salary: null,
    max_salary: null,
    description: ""
  };
  constructor(props) {
    super(props);

    const {
      id,
      currentJobIndex,
      title,
      recruiter,
      location,
      type,
      min_salary,
      max_salary,
      description
    } = this.props;

    this.state = {
      currentJobIndex,
      id,
      title,
      recruiter,
      location,
      type,
      min_salary,
      max_salary,
      description
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const userId = this.props.auth.user.username;
    if (this.state.id) {
      this.props.editInternalJob(this.state.id, {
        user_id: userId,
        title: this.state.title,
        recruiter: this.state.recruiter,
        min_salary: this.state.min_salary,
        max_salary: this.state.max_salary,
        description: this.state.description,
        location: this.state.location,
        type: this.state.type
      });
    } else {
      this.props.addInternalJob({
        user_id: userId,
        title: this.state.title,
        recruiter: this.state.recruiter,
        min_salary: this.state.min_salary,
        max_salary: this.state.max_salary,
        description: this.state.description,
        location: this.state.location,
        type: this.state.type
      });
    }
    this.setState({ ...this.defaultState });
  };

  /** Get Derived State From Props method
   *  We use this method so we can update the data in the form every time we choose a
   *  different job to edit
   */
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.currentJobIndex !== -1 && props.currentJobIndex < 0) {
      return {
        id: props.id,
        title: "",
        recruiter: "",
        location: "",
        min_salary: null,
        max_salary: null,
        description: ""
      };
    } else if (
      props.currentJobIndex !== -1 &&
      props.currentJobIndex !== current_state.currentJobIndex
    ) {
      // Check if we are using a different job and update state if we do
      return {
        id: props.id,
        title: props.title,
        recruiter: props.recruiter,
        location: props.location,
        min_salary: props.min_salary,
        max_salary: props.max_salary,
        description: props.description,
        currentJobIndex: props.currentJobIndex
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

  render() {
    // Select options for job type
    const options = [
      { label: "Select Job Type", value: 0 },
      { label: "Permanent", value: "permanent" },
      { label: "Temporary", value: "temporary" },
      { label: "Contract", value: "contract" },
      { label: "Full-time", value: "full-time" },
      { label: "Part-time", value: "part-time" }
    ];
    return (
      <div>
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
          <div className="form__field-label">* Location</div>
          <TextFieldGroup
            placeholder="* Location"
            name="location"
            value={this.state.location}
            required
            onChange={this.onChange}
          />
          <div className="form__field-label">Type</div>
          <SelectListGroup
            placeholder="Type"
            name="type"
            value={this.state.type}
            options={options}
            onChange={this.onChange}
          />
          <div className="form__field-label">Minimum Salary</div>
          <TextFieldGroup
            placeholder="Minimum Salary"
            name="min_salary"
            value={this.state.min_salary}
            type="number"
            onChange={this.onChange}
          />
          <div className="form__field-label">Maximum Salary</div>
          <TextFieldGroup
            placeholder="Maximum Salary"
            name="max_salary"
            value={this.state.max_salary}
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
          <input
            type="submit"
            value="Submit"
            className="btn btn-info btn-block mt-4"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  addInternalJob,
  editInternalJob
})(AddJobPostForm);
