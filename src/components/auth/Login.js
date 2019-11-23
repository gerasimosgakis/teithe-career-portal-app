import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../shared/TextFieldGroup";
import { loginUser } from "../../redux/actions/authActions";

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
        <div className="login__header mb2">
          <h1>Log In</h1>
          <p className="header-label">Sign in to your DevPals account</p>
        </div>
        <div className="login__form">
          <form onSubmit={this.onSubmit}>
            <div className="form__field-label">Email Address</div>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              required
            />
            <div className="form__field-label">Password</div>
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
            <div className="btn-group right">
              <Link to="/" className="button back-btn mr-1">
                Back
              </Link>
              <button className="button submit-btn">Log In</button>
            </div>
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

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
