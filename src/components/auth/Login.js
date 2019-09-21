import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../shared/TextFieldGroup";
import { loginUser } from "../../redux/actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ isLoading: true });

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user, this.props.history);
  };

  render() {
    return (
      <div className="login contain">
        <div className="login__header">
          <h1>Log In</h1>
          <p className="header-label">Sign in to your DevPals account</p>
        </div>
        <div className="login__form">
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              required
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              required
              error={
                this.state && this.state.errors && this.state.errors.message
                  ? this.state.errors.message
                  : ""
              }
            />
            <button className="login__form-buttons button submit-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
