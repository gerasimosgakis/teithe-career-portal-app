import React, { Component } from "react";
import { connect } from "react-redux";
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

  onSubmit = event => {
    event.preventDefault();
    const userId = this.props.auth.user.username;
    this.props.addInternalJob({
      user_id: userId,
      title: this.state.title,
      recruiter: this.state.recruiter,
      min_salary: this.state.minSalary,
      max_salary: this.state.maxSalary,
      description: this.state.description,
      location: this.state.location
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="contain">
        <h1 className="display-4 text-center">Job Posts</h1>
        {this.state.showForm && <AddJobPostForm />}
        <div className="mt2">
          <h2>
            My Jobs{" "}
            <button
              className="button transparent-btn transparent-btn--small ml1"
              data-toggle="modal"
              data-target="#addModal"
            >
              Add new
            </button>
          </h2>
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
                {this.state.currentJobIndex >= 0 ? (
                  <AddJobPostForm
                  // title={''}
                  // recruiter={''}
                  // location={this.state.location}
                  // min_salary={this.state.min_salary}
                  // max_salary={this.state.max_salary}
                  // description={this.state.description}
                  // currentJobIndex={this.state.currentJobIndex}
                  />
                ) : (
                  <AddJobPostForm title={""} />
                )}
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

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {
  addInternalJob,
  getInternalJobsByUser
})(withRouter(AddJobPost));
