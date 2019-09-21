import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isAuthenticated: false
    };
  }

  render() {
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

          <div className="collapse navbar-collapse" id="mobile-nav"></div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
