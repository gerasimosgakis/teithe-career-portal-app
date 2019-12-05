import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getInternalJobs } from "../../redux/actions/internalJobActions";
import Spinner from "../shared/Spinner";

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
      content = <div>INTERNAL JOBS</div>;
    }
    return <div className="contain">{content}</div>;
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
