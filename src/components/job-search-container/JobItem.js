import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";

import { connect } from "react-redux";
import { addJob } from "../../redux/actions/jobActions";

class JobItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      job: this.props.job,
      liked: this.props.favoriteJob
    };
  }

  addRemoveFav = jobId => {
    this.setState({ liked: !this.state.liked });
    this.props.onClick(jobId);
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
    // const transformedDate = date
    //   ? moment(new Date(date))
    //       .add(365, "day")
    //       .format("LL")
    //   : null;
    return (
      <div className="card mb2 job-item">
        <div className="card-body job-item__body">
          <button
            className={
              this.state.liked
                ? "button job-item__body-like-btn job-item__body-like-btn--full"
                : "button job-item__body-like-btn job-item__body-like-btn--empty"
            }
            onClick={() => this.addRemoveFav(jobId)}
          >
            <i className="fas fa-star"></i>
          </button>
          <h2>
            <a
              className="link-decoration"
              href={jobUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {jobTitle}
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
          <div>{ReactHtmlParser(jobDescription)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  favoriteJob: ownProps.favoriteJob,
  errors: state.errors
});

export default connect(mapStateToProps, { addJob })(JobItem);
