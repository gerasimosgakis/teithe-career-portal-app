import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getInternalJobs } from "../../redux/actions/internalJobActions";
import Spinner from "../shared/Spinner";
import InternalJobItem from "./InternalJobItem";

class InternalJobs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getInternalJobs();
  }

  render() {
    const { internalJobs, loading } = this.props.internalJobs;
    let content;

    if (internalJobs === null || loading) {
      content = <Spinner />;
    } else {
      content = internalJobs.map(job => (
        <InternalJobItem job={job}></InternalJobItem>
      ));
    }
    return (
      <div className="search-jobs contain">
        <div className="search-jobs__header mb4">
          <h1>Internal Job Search</h1>
          <p className="header-label">Let's get hired!</p>
        </div>
        <div className="search-jobs__results-main">{content}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    internalJobs: state.internalJobs
  };
};

export default connect(mapStateToProps, { getInternalJobs })(
  withRouter(InternalJobs)
);
