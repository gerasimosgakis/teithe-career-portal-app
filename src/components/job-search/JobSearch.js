import React, { Component } from "react";
import axios from "axios";
import { geolocated } from "react-geolocated";
import TextFieldGroup from "../shared/TextFieldGroup";
import JobItem from "./JobItem";
import Spinner from "../shared/Spinner";

class JobSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keywords: "",
      locationName: "",
      distanceFromLocation: 10,
      permanent: true,
      contract: false,
      temp: false,
      partTime: false,
      fullTime: true,
      minimumSalary: 0,
      maximumSalary: 100000,
      graduate: true,
      resultsToTake: 100,
      resultsToSkip: 0,
      jobs: [],
      loading: false,
      error: null
    };
  }
  componentDidMount() {}

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
      console.log(error);
    }
  }

  setLocation = async coords => {
    const postcode = await this.getLocation(coords.latitude, coords.longitude);
    this.setState({
      locationName: postcode
    });
  };

  async getJobs(keywords, locationName) {
    try {
      const jobs = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://www.reed.co.uk/api/1.0/search?keywords=${keywords}&locationName=${locationName}&distancefromlocation=15`,
        {
          headers: {
            Authorization:
              "Basic " + btoa("e4e25b88-7602-4b5f-835b-1fb30806b0d8:")
          }
        }
      );
      this.setState({
        loading: false,
        jobs: jobs.data.results
      });
      console.log(JSON.stringify(jobs.data.results[0]));
    } catch (error) {
      this.setState({ error });
    }
  }

  onSubmit = async event => {
    event.preventDefault();
    this.setState({
      loading: true,
      jobs: []
    });
    this.getJobs(this.state.keywords, this.state.locationName);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="search-jobs contain">
        <div className="search-jobs__header mb4">
          <h1>Job Search</h1>
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
                  required
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
                    required
                    onChange={this.onChange}
                  />
                  <button
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

        {/* Items */}

        {this.state.loading ? (
          <Spinner />
        ) : this.state.error ? (
          <div>
            <h2>Jobs</h2>
            <div className="card card-body">
              <p className="error-text">There was an error...</p>
            </div>
          </div>
        ) : (
          this.state.jobs.map((job, index) => (
            <JobItem key={job.jobId} job={job}></JobItem>
          ))
        )}
      </div>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(JobSearch);
