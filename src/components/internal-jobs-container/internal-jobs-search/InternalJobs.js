import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getInternalJobs,
  deleteInternalJob,
  searchJobPosts
} from "../../../redux/actions/internalJobActions";
import Spinner from "../../shared/Spinner";
import InternalJobItem from "./InternalJobItem";
import AddJobPostForm from "../add-job-post/AddJobPostForm";
import { confirmAlert } from "react-confirm-alert";
import TextFieldGroup from "../../shared/TextFieldGroup";

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
      type:
        this.props.internalJobs && this.props.internalJobs.length > 0
          ? this.props.internalJobs[0].type
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
          : null,
      // Search
      keywords: "",
      locationName: "",
      distanceFromLocation: 15,
      permanent: null,
      contract: null,
      temp: null,
      partTime: null,
      fullTime: null,
      minimumSalary: null,
      maximumSalary: null,
      jobs: null,
      loading: false,
      moreLoading: false,
      favoriteJobs: [],
      favoriteJobsDetails: [],
      error: null
    };
  }

  componentDidMount() {
    this.props.getInternalJobs();
  }

  onDeleteClick(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui card card-body text-center">
            <h2>Are you sure?</h2>
            <p>You want to delete this job post?</p>
            <div className="text-center">
              <button
                className="button button--small transparent-btn mr1"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="button button--small danger-btn"
                onClick={() => {
                  this.props.deleteInternalJob(id);
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      }
    });
  }

  onChange = async e => {
    await this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = async e => {
    await this.setState({
      [e]: this.state[e] === "" || !this.state[e] ? true : false
    });
    this.onSearchSubmit();
  };

  keyPressed = async event => {
    if (event.key === "Enter") {
      this.onSearchSubmit();
    }
  };

  onSearchSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    const {
      keywords,
      locationName,
      minimumSalary,
      maximumSalary,
      permanent,
      temp,
      contract,
      fullTime,
      partTime
    } = this.state;
    this.props.searchJobPosts({
      title: keywords,
      location: locationName,
      min_salary: minimumSalary,
      max_salary: maximumSalary,
      permanent,
      temp,
      contract,
      full_time: fullTime,
      part_time: partTime
    });
  };

  render() {
    const { internalJobs, loading } = this.props.internalJobs;
    let content;

    if (internalJobs === null || loading) {
      content = <Spinner />;
    } else {
      content = internalJobs.map((job, index) => (
        <div key={index} className="internal-jobs__job">
          <InternalJobItem job={job}></InternalJobItem>
          {this.props.auth.user.username === job.user_id && (
            <div className="internal-jobs__job-edit-buttons">
              <button
                className="icon-button icon-button--small "
                data-toggle="modal"
                data-target="#editModal"
                onClick={() => {
                  this.setState({
                    id: job.id,
                    title: job.title,
                    recruiter: job.recruiter,
                    location: job.location,
                    type: job.type,
                    min_salary: job.min_salary,
                    max_salary: job.max_salary,
                    description: job.description,
                    currentJobIndex: index
                  });
                }}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="icon-button icon-button--small icon-button--danger"
                onClick={() => {
                  this.onDeleteClick(job.id);
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}
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
        {/* Form */}
        <div className="search-jobs__form mb2">
          <form onSubmit={this.onSearchSubmit}>
            <div className="search-jobs__form-basic">
              <div className="search-jobs__form-basic-field mr2">
                <div className="form__field-label">Role</div>
                <TextFieldGroup
                  placeholder="Role"
                  name="keywords"
                  value={this.state.keywords}
                  onChange={this.onChange}
                />
              </div>
              <div className="search-jobs__form-basic-field">
                <div className="form__field-label">Location </div>
                <div className="form-group search-jobs__form-basic-field-location">
                  <input
                    type="text"
                    className="form-control form-control-lg search-jobs__form-basic-field-location-input"
                    placeholder="Location"
                    name="locationName"
                    value={this.state.locationName}
                    onChange={this.onChange}
                  />
                </div>
              </div>
            </div>
            <div className="btn-group right">
              <button className="button submit-btn">Search</button>
            </div>
          </form>
        </div>
        {/* Results */}
        <div className="search-jobs__results">
          <div className="search-jobs__results-side">
            {/* Filters */}
            <div className="search-jobs__results-side-filters mr2">
              <h2>Filters</h2>
              <form>
                <div className="form__field-label">Minimum Salary</div>
                <TextFieldGroup
                  placeholder="Minimum Salary"
                  name="minimumSalary"
                  type="number"
                  value={this.state.minimumSalary}
                  onChange={this.onChange}
                  onKeyPress={this.keyPressed}
                />
                <div className="form__field-label">Maximum Salary</div>
                <TextFieldGroup
                  placeholder="Maximum Salary"
                  name="maximumSalary"
                  type="number"
                  value={this.state.maximumSalary}
                  required
                  onChange={this.onChange}
                  onKeyPress={this.keyPressed}
                />

                {/* <fieldset> */}
                <div className="form__field-label">Job Type</div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="permanent"
                    checked={this.state.permanent}
                    onChange={() => this.onCheck("permanent")}
                    id="permanent"
                  />
                  <label className="form-check-label" htmlFor="permanent">
                    Permanent
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="temp"
                    checked={this.state.temp}
                    onChange={() => this.onCheck("temp")}
                    value={this.state.temp}
                  />
                  <label className="form-check-label" htmlFor="temp">
                    Temporary
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="contract"
                    checked={this.state.contract}
                    onChange={() => this.onCheck("contract")}
                    value={this.state.contract}
                  />
                  <label className="form-check-label" htmlFor="contract">
                    Contract
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="fullTime"
                    checked={this.state.fullTime}
                    onChange={() => this.onCheck("fullTime")}
                    value={this.state.fullTime}
                  />
                  <label className="form-check-label" htmlFor="fullTime">
                    Full-time
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="partTime"
                    checked={this.state.partTime}
                    onChange={() => this.onCheck("partTime")}
                    value={this.state.partTime}
                  />
                  <label className="form-check-label" htmlFor="partTime">
                    Part-time
                  </label>
                </div>
                {/* </fieldset> */}
              </form>
            </div>
          </div>
          {/* Jobs display */}
          <div className="search-jobs__results-main">{content}</div>
        </div>
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
                {/* {this.state.currentJobIndex >= 0 ? (
                  <AddJobPostForm
                    id={this.state.id}
                    title={this.state.title}
                    recruiter={this.state.recruiter}
                    location={this.state.location}
                    type={this.state.type}
                    min_salary={this.state.min_salary}
                    max_salary={this.state.max_salary}
                    description={this.state.description}
                    currentJobIndex={this.state.currentJobIndex}
                  />
                ) : (
                  <AddJobPostForm title={""} />
                )} */}
                <AddJobPostForm
                  id={this.state.id}
                  title={this.state.title}
                  recruiter={this.state.recruiter}
                  location={this.state.location}
                  type={this.state.type}
                  min_salary={this.state.min_salary}
                  max_salary={this.state.max_salary}
                  description={this.state.description}
                  currentJobIndex={this.state.currentJobIndex}
                />
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

export default connect(mapStateToProps, {
  getInternalJobs,
  deleteInternalJob,
  searchJobPosts
})(InternalJobs);
