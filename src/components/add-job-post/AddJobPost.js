import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../shared/TextFieldGroup";
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";
import { addInternalJob } from "../../redux/actions/internalJobActions";

class AddJobPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      recruiter: "",
      location: "",
      minSalary: null,
      maxSalary: null,
      description: ""
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const userId = this.props.auth.user.username;
    console.log(this.state, userId);
    this.props.addInternalJob({
      user_id: userId,
      title: this.state.title,
      recruiter: this.state.recruiter,
      min_salary: this.state.minSalary,
      max_salary: this.state.maxSalary,
      description: this.state.description,
      location: this.state.location
    });
  };

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
            <div className="form__field-label">* Location</div>
            <TextFieldGroup
              placeholder="* Location"
              name="location"
              value={this.state.location}
              required
              onChange={this.onChange}
            />
            <div className="form__field-label">Minimum Salary</div>
            <TextFieldGroup
              placeholder="Minimum Salary"
              name="minSalary"
              value={this.state.minSalary}
              type="number"
              onChange={this.onChange}
            />
            <div className="form__field-label">Maximum Salary</div>
            <TextFieldGroup
              placeholder="Maximum Salary"
              name="maxSalary"
              value={this.state.maxSalary}
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
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { addInternalJob })(
  withRouter(AddJobPost)
);
