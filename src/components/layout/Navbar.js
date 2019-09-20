import React, { Component } from "react";

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isAuthenticated: false
    };
  }

  render() {
    return <div>Navbar</div>;
  }
}

export default Navbar;
