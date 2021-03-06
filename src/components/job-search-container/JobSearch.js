import React, { Component } from "react";
import axios from "axios";
import { geolocated } from "react-geolocated";
import TextFieldGroup from "../shared/TextFieldGroup";
import JobItem from "./JobItem";
import Spinner from "../shared/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFavJobs, addJob, removeJob } from "../../redux/actions/jobActions";

class JobSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: "",
      locationName: "",
      distanceFromLocation: 15,
      permanent: "",
      contract: "",
      temp: "",
      partTime: "",
      fullTime: "",
      minimumSalary: 0,
      maximumSalary: 100000,
      graduate: "",
      resultsToTake: 20,
      resultsToSkip: 0,
      jobs: [],
      loading: false,
      moreLoading: false,
      favoriteJobs: [],
      favoriteJobsDetails: [],
      error: null
    };
  }

  async componentDidMount() {
    const currentUserId = this.props.auth.user.username;
    await this.props.getFavJobs(currentUserId);
    this.setState({ favoriteJobs: this.props.favoriteJobs });
    this.setState({
      loading: true
    });
    await this.getFavoriteJobsDetails();
    this.setState({
      loading: false
    });
  }

  /**
   * Gets location
   * @param {*} latitude
   * @param {*} longitude
   */
  async getLocation(latitude, longitude) {
    var apikey = "d68690d89dff4842a10bc42493a2a90e";

    var api_url = "https://api.opencagedata.com/geocode/v1/json";

    var request_url =
      api_url +
      "?" +
      "key=" +
      apikey +
      "&q=" +
      encodeURIComponent(latitude + "," + longitude) +
      "&pretty=1" +
      "&no_annotations=1";
    try {
      const location = await axios.get(request_url);
      return location.data.results[0].components.postcode;
    } catch (error) {
      console.warn(error);
    }
  }

  /**
   * Uses getLocation and adds location to the state
   * @param {*} coords - coordinates
   */
  setLocation = async coords => {
    const postcode = await this.getLocation(coords.latitude, coords.longitude);
    this.setState({
      locationName: postcode
    });
  };

  /**
   * Gets favorite jobs details
   */
  getFavoriteJobsDetails = async () => {
    try {
      const favoriteJobs = await Promise.all(
        this.state.favoriteJobs.map(jobId => {
          const job = axios.get(
            `https://cors-anywhere.herokuapp.com/https://www.reed.co.uk/api/1.0/jobs/${parseInt(
              jobId
            )}`,
            {
              headers: {
                Authorization:
                  "Basic " + btoa("e4e25b88-7602-4b5f-835b-1fb30806b0d8:")
              }
            }
          );
          return job;
        })
      );
      const favoriteJobsDetails = favoriteJobs.map(job => {
        return job.data;
      });

      this.setState({
        favoriteJobsDetails: [...favoriteJobsDetails]
      });
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * Gets jobs
   */
  getJobs = async () => {
    const {
      keywords,
      locationName,
      distanceFromLocation,
      permanent,
      contract,
      temp,
      partTime,
      fullTime,
      minimumSalary,
      maximumSalary,
      resultsToTake,
      resultsToSkip
    } = this.state;
    try {
      const jobs = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.reed.co.uk/api/1.0/search?keywords=${keywords}&locationName=${locationName}&distancefromlocation=${distanceFromLocation ||
          15}&minimumSalary=${minimumSalary}&maximumSalary=${maximumSalary}&permanent=${permanent}&fullTime=${fullTime}&temp=${temp}&partTime=${partTime}&contract=${contract}&resultsToTake=${resultsToTake}&resultsToSkip=${resultsToSkip}`,
        {
          headers: {
            Authorization:
              "Basic " + btoa("e4e25b88-7602-4b5f-835b-1fb30806b0d8:")
          }
        }
      );
      return jobs.data.results;
    } catch (error) {
      this.setState({ error });
    }
  };

  onSubmit = async event => {
    event.preventDefault();
    await this.getFavoriteJobsDetails();
    await this.setState({
      loading: true
    });
    const jobs = await this.getJobs();
    await this.setState({
      loading: false,
      jobs,
      resultsToSkip: 20
    });
  };

  onChange = async e => {
    await this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * On Enter gets jobs using the parameters the user added in the search fields
   */
  keyPressed = async event => {
    if (event.key === "Enter") {
      await this.setState({
        resultsToSkip: 0,
        loading: true
      });
      const jobs = await this.getJobs();
      this.setState({
        loading: false,
        jobs,
        resultsToSkip: 20
      });
    }
  };

  onCheck = async e => {
    await this.setState({
      [e]: this.state[e] === "" || !this.state[e] ? true : false,
      resultsToSkip: 0,
      loading: true
    });
    const jobs = await this.getJobs();
    this.setState({
      loading: false,
      jobs,
      resultsToSkip: 20
    });
  };

  /**
   * Loads more jobs
   */
  loadMore = async () => {
    await this.setState({
      ...this.state,
      resultsToSkip: this.state.jobs.length,
      moreLoading: true
    });
    const moreJobs = await this.getJobs();
    this.setState({
      jobs: [...this.state.jobs, ...moreJobs],
      moreLoading: false
    });
  };

  /**
   * On Favorite Click adds job into the favorite jobs or removes it if it was already added
   * @param {*} jobId
   */
  onFavoriteClick = jobId => {
    const currentUserId = this.props.auth.user.username;
    const jobIndex = this.state.favoriteJobs.findIndex(
      item => item === jobId.toString() || item === jobId
    );
    if (jobIndex < 0) {
      this.setState({ favoriteJobs: [...this.state.favoriteJobs, jobId] });
      this.props.addJob({ user_id: currentUserId, job_id: jobId.toString() });
    } else {
      const newFavoriteJobs = [
        ...this.state.favoriteJobs.slice(0, jobIndex),
        ...this.state.favoriteJobs.slice(jobIndex + 1)
      ];
      this.setState({
        favoriteJobs: newFavoriteJobs
      });
      this.props.removeJob(jobId);
    }
  };

  render() {
    let jobsResultsContent; // The content of the job results
    if (this.state.loading) {
      jobsResultsContent = <Spinner />;
    } else {
      if (this.state.error) {
        jobsResultsContent = (
          <div>
            <div className="card card-body">
              <p className="error-text">There was an error...</p>
            </div>
          </div>
        );
      } else {
        jobsResultsContent = (
          <div>
            {this.state.favoriteJobsDetails.map((job, index) => (
              <JobItem
                key={index}
                job={job}
                favoriteJob={
                  this.state.favoriteJobs.includes(job.jobId.toString()) ||
                  this.state.favoriteJobs.includes(job.jobId)
                }
                onClick={this.onFavoriteClick}
              ></JobItem>
            ))}
            {this.state.jobs.length > 0 ? (
              this.state.jobs.map(
                (job, index) =>
                  this.state.favoriteJobsDetails &&
                  !this.state.favoriteJobs.includes(job.jobId.toString()) && (
                    <JobItem
                      key={index + this.state.favoriteJobsDetails.length}
                      job={job}
                      favoriteJob={this.state.favoriteJobs.includes(
                        job.jobId.toString() ||
                          this.state.favoriteJobs.includes(job.jobId)
                      )}
                      onClick={this.onFavoriteClick}
                    ></JobItem>
                  )
              )
            ) : (
              <div className="text-center mt4">
                <h2>There are no jobs to display...</h2>
              </div>
            )}
            {this.state.jobs.length > 0 && (
              <div className="btn-group right">
                <button
                  className="button transparent-btn"
                  disabled={this.state.moreLoading}
                  onClick={this.loadMore}
                >
                  {this.state.moreLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        );
      }
    }
    return (
      <div className="search-jobs contain">
        <div className="search-jobs__header mb4">
          <h1>External Job Search</h1>
          <p className="header-label">Let's get hired!</p>
        </div>

        {/* Form */}
        <div className="search-jobs__form mb2">
          <form onSubmit={this.onSubmit}>
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
                  <button
                    type="button"
                    className="icon-button search-jobs__form-basic-field-location-button"
                    disabled={!this.props.coords}
                    onClick={() => this.setLocation(this.props.coords)}
                  >
                    <i className="fas fa-search-location fa-2x"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="btn-group right">
              <button className="button submit-btn">Search</button>
            </div>
          </form>
        </div>
        {/* / Form */}

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
                  small="true"
                  value={this.state.minimumSalary}
                  onChange={this.onChange}
                  onKeyPress={this.keyPressed}
                />
                <div className="form__field-label">Maximum Salary</div>
                <TextFieldGroup
                  placeholder="Maximum Salary"
                  name="maximumSalary"
                  small="true"
                  value={this.state.maximumSalary}
                  required
                  onChange={this.onChange}
                  onKeyPress={this.keyPressed}
                />

                <div className="form__field-label">Job Type</div>
                <div className="form__check mb1">
                  <input
                    className="form__check-input"
                    type="checkbox"
                    name="permanent"
                    checked={this.state.permanent}
                    onChange={() => this.onCheck("permanent")}
                    id="permanent"
                  />
                  <label className="form__check-label" htmlFor="permanent">
                    Permanent
                  </label>
                </div>
                <div className="form__check mb1">
                  <input
                    className="form__check-input"
                    type="checkbox"
                    name="temp"
                    checked={this.state.temp}
                    onChange={() => this.onCheck("temp")}
                    value={this.state.temp}
                  />
                  <label className="form__check-label" htmlFor="temp">
                    Temporary
                  </label>
                </div>
                <div className="form__check mb1">
                  <input
                    className="form__check-input"
                    type="checkbox"
                    name="contract"
                    checked={this.state.contract}
                    onChange={() => this.onCheck("contract")}
                    value={this.state.contract}
                  />
                  <label className="form__check-label" htmlFor="contract">
                    Contract
                  </label>
                </div>
                <div className="form__check mb1">
                  <input
                    className="form__check-input"
                    type="checkbox"
                    name="fullTime"
                    checked={this.state.fullTime}
                    onChange={() => this.onCheck("fullTime")}
                    value={this.state.fullTime}
                  />
                  <label className="form__check-label" htmlFor="fullTime">
                    Full-time
                  </label>
                </div>
                <div className="form__check mb1">
                  <input
                    className="form__check-input"
                    type="checkbox"
                    name="partTime"
                    checked={this.state.partTime}
                    onChange={() => this.onCheck("partTime")}
                    value={this.state.partTime}
                  />
                  <label className="form__check-label" htmlFor="partTime">
                    Part-time
                  </label>
                </div>
              </form>
            </div>
            {/* / Filters */}
          </div>
          <div className="search-jobs__results-main">
            {/* Items */}
            <div className="search-jobs__results-main-jobs">
              {jobsResultsContent}
            </div>
            {/* / Items */}
          </div>
        </div>
      </div>
    );
  }
}

JobSearch.propTypes = {
  auth: PropTypes.object.isRequired,
  favoriteJobs: PropTypes.array,
  errors: PropTypes.object,
  getFavJobs: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired,
  removeJob: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  favoriteJobs: state.jobs.favoriteJobs,
  errors: state.errors
});

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(connect(mapStateToProps, { getFavJobs, addJob, removeJob })(JobSearch));
