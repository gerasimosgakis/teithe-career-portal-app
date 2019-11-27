// import React from "react";

// export const JobItem = (key, job) => {
//   return (
//     <div className="card mb2">
//       <div className="card-body">
//         <p>{key}</p>
//       </div>
//     </div>
//   );
// };

import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { addJob } from "../../redux/actions/jobActions";

class JobItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      job: this.props.job,
      liked: []
    };
  }

  // async getJobs() {
  //   const {
  //     keywords,
  //     locationName,
  //     distanceFromLocation,
  //     permanent,
  //     contract,
  //     temp,
  //     partTime,
  //     fullTime,
  //     minimumSalary,
  //     maximumSalary,
  //     graduate,
  //     resultsToTake,
  //     resultsToSkip
  //   } = this.state;
  //   try {
  //     const jobs = await axios.get(
  //       `https://cors-anywhere.herokuapp.com/https://www.reed.co.uk/api/1.0/search?keywords=${keywords}&locationName=${locationName}&distancefromlocation=${distanceFromLocation ||
  //         15}&minimumSalary=${minimumSalary}&maximumSalary=${maximumSalary}&fullTime=${fullTime}&temp=${temp}&partTime=${partTime}&contract=${contract}&resultsToTake=${resultsToTake}&resultsToSkip=${resultsToSkip}`,
  //       {
  //         headers: {
  //           Authorization:
  //             "Basic " + btoa("e4e25b88-7602-4b5f-835b-1fb30806b0d8:")
  //         }
  //       }
  //     );
  //     return jobs.data.results;
  //   } catch (error) {
  //     this.setState({ error });
  //   }
  // }

  componentDidMount() {
    console.log(this.props);
  }

  addRemoveFav = jobId => {
    const currentUserId = this.props.auth.user.username;
    console.log(jobId, currentUserId);
    const jobIndex = this.state.liked.findIndex(item => item === jobId);
    if (jobIndex < 0) {
      this.setState({ liked: [...this.state.liked, jobId] });
    } else {
      this.setState({ liked: [...this.state.liked.split(jobIndex, 1)] });
    }

    this.props.addJob({ job_id: jobId, user_id: currentUserId });
    console.log(jobIndex);
    // this.setState({
    //   liked: !this.state.liked.includes(jobId)
    //     ? [...this.state.liked, jobId]
    //     : [...this.state.liked.shift]
    // });
    // const result = await axios.;
  };

  render() {
    const {
      jobTitle,
      date,
      employerName,
      minimumSalary,
      maximumSalary,
      locationName,
      jobDescription,
      jobUrl,
      jobId
    } = this.state.job;
    const transformedDate = date
      ? moment(new Date(date))
          .add(365, "day")
          .format("LL")
      : null;
    return (
      <div className="card mb2 job-item">
        <div className="card-body job-item__body">
          <button
            className={
              this.state.liked.includes(jobId.toString()) ||
              this.props.favoriteJob
                ? "button job-item__body-like-btn job-item__body-like-btn--full"
                : "button job-item__body-like-btn job-item__body-like-btn--empty"
            }
            onClick={() => this.addRemoveFav(jobId)}
          >
            <i className="fas fa-heart"></i>
          </button>
          <h2>
            <a className="link-decoration" href={jobUrl} target="_blank">
              {jobTitle} {jobId}
            </a>
          </h2>
          <div className="mb2">
            {date} <span className="help-text">posted by</span> {employerName}
          </div>
          <div className="flex mb2">
            {minimumSalary && maximumSalary && (
              <div className="mr2">
                <span className="mr-half">
                  <i className="fas fa-dollar-sign"></i>
                </span>
                <span className="bolded">
                  {minimumSalary} - {maximumSalary}
                </span>
              </div>
            )}
            <div>
              <span className="mr-half">
                <i className="fas fa-map-marker-alt"></i>
              </span>
              <span className="bolded">{locationName}</span>
            </div>
          </div>
          <p>{jobDescription}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  favoriteJobs: ownProps.favoriteJob,
  errors: state.errors
});

export default connect(mapStateToProps, { addJob })(JobItem);
