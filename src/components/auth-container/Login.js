import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../shared/TextFieldGroup";
import { loginUser, clearErrors } from "../../redux/actions/authActions";
import Spinner from "../shared/Spinner";
import LoadingText from "../shared/LoadingText";

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

  componentDidMount() {
    this.props.clearErrors();
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
    const { auth } = this.props;
    return (
      <div className="login contain">
        <div className="login__header mb2">
          <h1>Log In</h1>
          <p className="header-label">Sign in to your career portal account</p>
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
                auth && auth.errors && auth.errors.message
                  ? auth.errors.message.message
                  : ""
              }
            />
            <div className="btn-group right">
              <Link to="/" className="button button--wide back-btn mr-1">
                Back
              </Link>
              <button className="button button--wide submit-btn">
                <LoadingText text="Log In" show={auth.loading} />
              </button>
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

export default connect(mapStateToProps, { loginUser, clearErrors })(
  withRouter(Login)
);
