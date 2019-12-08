import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getInternalJobs } from "../../../redux/actions/internalJobActions";
import Spinner from "../../shared/Spinner";
import InternalJobItem from "./InternalJobItem";
import AddJobPostForm from "../add-job-post/AddJobPostForm";

class InternalJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJobIndex: -1,
      title:
        this.props.internalJobs && this.props.internalJobs.length > 0
          ? this.props.internalJobs[0].title
          : null,
      recruiter:
        this.props.internalJobs && this.props.internalJobs.length > 0
          ? this.props.internalJobs[0].recruiter
          : null,
      location:
        this.props.internalJobs && this.props.internalJobs.length > 0
          ? this.props.internalJobs[0].location
          : null,
      min_salary:
        this.props.internalJobs && this.props.internalJobs.length > 0
          ? this.props.internalJobs[0].min_salary
          : null,
      max_salary:
        this.props.internalJobs && this.props.internalJobs.length > 0
          ? this.props.internalJobs[0].max_salary
          : null,
      description:
        this.props.internalJobs && this.props.internalJobs.length > 0
          ? this.props.internalJobs[0].description
          : null
    };
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
      content = internalJobs.map((job, index) => (
        <div>
          <InternalJobItem job={job}></InternalJobItem>
          <button
            className="icon-button icon-button--small"
            data-toggle="modal"
            data-target="#editModal"
            onClick={() => {
              // this.currentExperienceIndex = index;
              this.setState({
                id: job.id,
                title: job.title,
                recruiter: job.recruiter,
                location: job.location,
                min_salary: job.min_salary,
                max_salary: job.max_salary,
                description: job.description,
                currentJobIndex: index
              });
              // console.log(this.currentExperienceIndex);
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
      ));
    }
    return (
      <div className="search-jobs">
        {this.props.header && (
          <div className="search-jobs__header mb4">
            <h1>Internal Job Search</h1>
            <p className="header-label">Let's get hired!</p>
          </div>
        )}
        <div className="search-jobs__results-main">{content}</div>
        {/* Job Edit Modal */}
        <div className="modal fade" id="editModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Job</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {this.state.currentJobIndex >= 0 ? (
                  <AddJobPostForm
                    id={this.state.id}
                    title={this.state.title}
                    recruiter={this.state.recruiter}
                    location={this.state.location}
                    min_salary={this.state.min_salary}
                    max_salary={this.state.max_salary}
                    description={this.state.description}
                    currentJobIndex={this.state.currentJobIndex}
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
    auth: state.auth,
    internalJobs: state.internalJobs
  };
};

export default connect(mapStateToProps, { getInternalJobs })(
  withRouter(InternalJobs)
);
