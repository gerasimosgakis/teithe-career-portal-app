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

class JobItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      job: this.props.job
    };
  }

  render() {
    const {
      jobTitle,
      date,
      employerName,
      minimumSalary,
      maximumSalary,
      locationName,
      jobDescription,
      jobUrl
    } = this.state.job;
    const transformedDate = moment(date)
      .add(365, "day")
      .format("LL");
    return (
      <div className="card mb2">
        <div className="card-body">
          <h2>
            <a className="link-decoration" href={jobUrl} target="_blank">
              {jobTitle}
            </a>
          </h2>
          <div className="mb2">
            {transformedDate} <span className="help-text">posted by</span>{" "}
            {employerName}
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

export default JobItem;
