import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser, confirmUser } from "../../redux/actions/authActions";
import TextFieldGroup from "../shared/TextFieldGroup";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      user: null,
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onConfirmationSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const userConfirm = {
      email: this.props.auth.user.user.username,
      confirmationCode: this.state.confirmationCode
    };

    this.props.confirmUser(userConfirm, this.props.history);
  };

  renderConfirmationForm() {
    return (
      <form onSubmit={this.onConfirmationSubmit}>
        <TextFieldGroup
          placeholder="Confirmation Code"
          name="confirmationCode"
          type="text"
          value={this.state.confirmationCode}
          onChange={this.onChange}
        />
        <button className="register__form-buttons button submit-btn">
          Submit
        </button>
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="Name"
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.onChange}
        />
        <TextFieldGroup
          placeholder="Email Address"
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.onChange}
        />
        <TextFieldGroup
          placeholder="Password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.onChange}
        />
        <TextFieldGroup
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.onChange}
        />
        {/* <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        /> */}
        <button className="register__form-buttons button submit-btn">
          Sign Up
        </button>
      </form>
    );
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="register contain">
        <div className="register__header">
          <h1>Sign Up</h1>
          <p className="header-label">Create your Career Portal profile</p>
          <div className="register__form">
            {auth.isAuthenticated && !auth.userConfirmed
              ? this.renderConfirmationForm()
              : this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, confirmUser }
)(withRouter(Register));
