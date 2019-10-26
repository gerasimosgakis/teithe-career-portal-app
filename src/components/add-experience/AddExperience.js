import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class AddExperience extends Component {
  constructor(props) {
    super(props);

    const { experiences } = this.props;

    this.state = {
      current: false,
      location: experiences && experiences.location ? experiences.location : "",
      description:
        experiences && experiences.description ? experiences.description : "",
      title: experiences && experiences.title ? experiences.title : "",
      start_date:
        experiences && experiences.start_date ? experiences.start_date : "",
      end_date: experiences && experiences.end_date ? experiences.end_date : "",
      company: experiences && experiences.company ? experiences.company : ""
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps);
  //   // if (nextProps.experiences.title !== this.state.title) {
  //   //   this.setState({
  //   //     title: nextProps.experiences.title
  //   //   });
  //   // }
  //   Object.keys(this.state).map(key => {
  //     if (nextProps.experiences[key] !== this.state[key]) {
  //       this.setState({
  //         key: nextProps.experiences[key]
  //       });
  //     }
  //   });
  //   return true;
  // }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    // if (nextProps.experiences.title !== this.state.title) {
    //   this.setState({
    //     title: nextProps.experiences.title
    //   });
    // }
    Object.keys(this.state).map(key => {
      if (nextProps.experiences[key] !== this.state[key]) {
        console.log("change");
        this.setState({
          key: nextProps.experiences[key]
        });
      }
    });
    return true;
  }

  render() {
    return <div>test{this.state.title}</div>;
  }
}

// const mapStateToProps = state => ({
//   profiles: state.profiles
// });

export default connect(
  null,
  {}
)(withRouter(AddExperience));
