import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../logo_tei.jpg";
import PropTypes from "prop-types";

class Landing extends Component {
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
      <div className="landing contain">
        <div className="landing__logo">
          <img src={logo} alt="logo" className="landing__logo-image" />
        </div>
        <div className="landing__slogan mt-4">
          <p className="landing__slogan-text lead-text">
            Αλεξάνδρειο Τεχνολογικό Εκπαιδευτικό Ίδρυμα Θεσσαλονίκης - Career
            Portal
          </p>
          {this.props.auth.isAuthenticated ? (
            <Link to="/dashboard">
              <button className="button submit-btn">Go to Dashboard</button>
            </Link>
          ) : (
            <Fragment>
              <Link to="/register">
                <button className="button submit-btn mr1">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="button back-btn">Login</button>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
  // <div className="landing contain">
  //   {/* <div className="landing__logo">
  //     <img src={logo} alt="logo" className="landing__logo-image" />
  //   </div> */}
  //   <div className="landing__slogan mt-4">
  //     <p className="landing__slogan-text lead-text">
  //       Αλεξάνδρειο Τεχνολογικό Εκπαιδευτικό Ίδρυμα Θεσσαλονίκης - Career
  //       Portal
  //     </p>
  //     {/* <Link to="/register" className="btn btn-lg btn-info mr-2">
  //         Sign Up
  //       </Link> */}
  //     {this.props.auth.isAuthenticated ? (
  //       <Link to="/dashboard">
  //         <button className="button submit-btn">Go to Dashboard</button>
  //       </Link>
  //     ) : (
  //       <Fragment>
  //         <Link to="/register">
  //           <button className="button submit-btn mr1">Sign Up</button>
  //         </Link>
  //         <Link to="/login">
  //           <button className="button back-btn">Login</button>
  //         </Link>
  //       </Fragment>
  //     )}
  //   </div>
  // </div>
}

Landing.propTypes = {
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
)(withRouter(Landing));
