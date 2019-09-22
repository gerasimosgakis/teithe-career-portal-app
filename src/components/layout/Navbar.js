import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
// import { logoutUser } from "../../redux/actions/authActions";
// import { clearCurrentProfile } from "../../redux/actions/profileActions";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isAuthenticated: false,
      errors: {}
    };
  }

  render() {
    const { auth } = this.props;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Careers
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              {this.props.auth.isAuthenticated ? (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profiles">
                      {" "}
                      Graduates
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/feed">
                      {" "}
                      Post Feed
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/chat">
                      {" "}
                      Chat
                    </Link>
                  </li>
                </Fragment>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    {" "}
                    Graduates
                  </Link>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ml-auto">
              {this.props.auth.isAuthenticated ? (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      <img
                        className="rounded-circle d-none d-md-block"
                        src={auth.user.avatar}
                        alt="avatar"
                      />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      href="_target"
                      rel="noopener noreferrer"
                      className="nav-link mt-half"
                      onClick={this.onLogout}
                    >
                      Logout
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/settings">
                      <i className="fas fa-cog mt-half" />
                    </Link>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  // logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  null
)(withRouter(Navbar));
