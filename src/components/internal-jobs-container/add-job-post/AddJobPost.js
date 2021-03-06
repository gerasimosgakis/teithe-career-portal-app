import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { addInternalJob } from "../../../redux/actions/internalJobActions";
import { getInternalJobsByUser } from "../../../redux/actions/internalJobActions";
import InternalJobs from "../internal-jobs-search/InternalJobs";
import AddJobPostForm from "./AddJobPostForm";

class AddJobPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      recruiter: "",
      location: "",
      minSalary: null,
      maxSalary: null,
      description: "",
      showForm: false
    };
  }

  componentDidMount() {
    this.props.getInternalJobsByUser(this.props.auth.user.username);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="contain">
        <h1 className="display-4 text-center">Job Posts</h1>
        <div className="mt2">
          <div className="d-flex justify-space-between mb2">
            <h2>My Jobs </h2>
            <button
              className="button transparent-btn transparent-btn--small ml1"
              data-toggle="modal"
              data-target="#addModal"
            >
              Add New
            </button>
          </div>
          <InternalJobs />
        </div>
        {/* Job Add Modal */}
        <div className="modal fade" id="addModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Job</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <AddJobPostForm />
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
      </div>
    );
  }
}

AddJobPost.propTypes = {
  auth: PropTypes.object.isRequired,
  addInternalJob: PropTypes.func.isRequired,
  getInternalJobsByUser: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  addInternalJob,
  getInternalJobsByUser
})(withRouter(AddJobPost));
