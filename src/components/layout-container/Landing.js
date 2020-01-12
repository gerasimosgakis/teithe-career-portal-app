import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../assets/hatchful/logo_transparent.png";
import PropTypes from "prop-types";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
  }
  render() {
    const { auth } = this.props;
    return (
      <div className="landing contain">
        <div className="landing__logo">
          <img src={logo} alt="logo" className="landing__logo-image" />
        </div>
        <div className="landing__slogan mt-4">
          <p className="landing__slogan-text lead-text">
            The best career portal for alumni - Stay in touch with the
            institution and let your career take off
          </p>
          {auth.isAuthenticated ? (
            <Link to="/profile">
              <button className="button submit-btn">Go to Dashboard</button>
            </Link>
          ) : (
            <Fragment>
              <Link to="/register">
                <button className="button submit-btn mr1">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="button transparent-btn">Login</button>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, null)(withRouter(Landing));
