import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import AddCV from "../add-cv-container/AddCV";
import Avatar from "react-avatar";
import { getProfileById } from "../../redux/actions/profileActions";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabClassName: null,
      errors: {}
    };
  }

  /**
   * Logs user out
   */
  onLogout = async e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  /**
   * Gets specific user's profile data
   */
  getProfileData = () => {
    this.props.getProfileById(this.props.auth.user.username);
    this.props.history.push("/profile");
    this.setState({ activeTabClassName: "" });
  };

  render() {
    const { auth } = this.props;
    let leftLinks, rightLinks;
    // Left Links
    if (
      auth.isAuthenticated &&
      auth.user.attributes["custom:role"] === "recruiter"
    ) {
      leftLinks = (
        <Fragment>
          <li
            onClick={() => this.setState({ activeTabClassName: "graduates" })}
            className={
              this.state.activeTabClassName === "graduates"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/graduates">
              {" "}
              Graduates
            </Link>
          </li>
          <li
            onClick={() =>
              this.setState({ activeTabClassName: "add-job-post" })
            }
            className={
              this.state.activeTabClassName === "add-job-post"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/add-job-post">
              {" "}
              Add Job Post
            </Link>
          </li>
        </Fragment>
      );
    } else if (
      auth.isAuthenticated &&
      auth.user.attributes["custom:role"] !== "recruiter"
    ) {
      leftLinks = (
        <Fragment>
          <li
            onClick={() => this.setState({ activeTabClassName: "graduates" })}
            className={
              this.state.activeTabClassName === "graduates"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/graduates">
              {" "}
              Graduates
            </Link>
          </li>
          <li
            onClick={() => this.setState({ activeTabClassName: "feed" })}
            className={
              this.state.activeTabClassName === "feed"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/feed">
              {" "}
              Post Feed
            </Link>
          </li>
          <li
            onClick={() => this.setState({ activeTabClassName: "chat" })}
            className={
              this.state.activeTabClassName === "chat"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/chat">
              {" "}
              Chat
            </Link>
          </li>
          <li
            onClick={() => this.setState({ activeTabClassName: "job-search" })}
            className={
              this.state.activeTabClassName === "job-search"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/job-search">
              {" "}
              External Jobs
            </Link>
          </li>
          <li
            onClick={() =>
              this.setState({ activeTabClassName: "internal-jobs" })
            }
            className={
              this.state.activeTabClassName === "internal-jobs"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/internal-jobs">
              {" "}
              Internal Jobs
            </Link>
          </li>
          <li className="nav-item">
            <button
              data-toggle="modal"
              data-target="#cvModal"
              rel="noopener noreferrer"
              className="nav-link nav-button"
            >
              Add CV
            </button>
          </li>
        </Fragment>
      );
    } else {
      leftLinks = "";
    }

    // Right Links
    if (auth.isAuthenticated) {
      rightLinks = (
        <Fragment>
          <li className="nav-item">
            <button
              type="button"
              className="nav-link nav-button mt0"
              onClick={this.getProfileData}
            >
              <Avatar
                email={auth.user.attributes.email}
                name={auth.user.attributes.name.toLowerCase()}
                round={true}
                size="30"
              />
            </button>
          </li>
          <li
            className="nav-item"
            onClick={() => this.setState({ activeTabClassName: "" })}
          >
            <button
              type="button"
              className="nav-link nav-button"
              onClick={this.onLogout}
            >
              Logout
            </button>
          </li>
        </Fragment>
      );
    } else {
      rightLinks = (
        <Fragment>
          <li
            onClick={() => this.setState({ activeTabClassName: "signup" })}
            className={
              this.state.activeTabClassName === "signup"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </li>
          <li
            onClick={() => this.setState({ activeTabClassName: "login" })}
            className={
              this.state.activeTabClassName === "login"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </Fragment>
      );
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark">
        <div className="container">
          <Link
            className="navbar-brand"
            onClick={() => this.setState({ activeTabClassName: "" })}
            to="/"
          >
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
            <ul className="navbar-nav mr-auto">{leftLinks}</ul>
            <ul className="navbar-nav ml-auto">{rightLinks}</ul>
          </div>
        </div>
        {/* Add CV Modal */}
        <div className="modal fade" id="cvModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add CV</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <AddCV></AddCV>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { logoutUser, getProfileById })(
  withRouter(Navbar)
);
