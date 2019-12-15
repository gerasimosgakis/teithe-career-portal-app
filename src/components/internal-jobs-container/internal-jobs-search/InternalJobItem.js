import React, { Component } from "react";
import { connect } from "react-redux";
import titleCase from "../../../shared/functions/titleCase";
import ReactHtmlParser from "react-html-parser";

class InternalJobItem extends Component {
  render() {
    const { job } = this.props;
    // const transformedDate = job.created_at
    //   ? moment(new Date(job.created_at))
    //       .add(365, "day")
    //       .format("LL")
    //   : null;
    return (
      <div className="card mb2 job-item">
        <div className="card-body job-item__body">
          <h2>{titleCase(job.title)}</h2>
          <div className="mb2">
            {new Date(parseInt(job.created_at)).toLocaleDateString()}{" "}
            <span className="help-text">posted by</span>{" "}
            {titleCase(job.recruiter)}
          </div>
          <div className="flex mb2">
            {job.min_salary && job.max_salary && (
              <div className="mr2">
                <span className="mr-half">
                  <i className="fas fa-dollar-sign"></i>
                </span>
                <span className="bolded">
                  {job.min_salary} - {job.max_salary}
                </span>
              </div>
            )}
            {job.location && (
              <div className="mr2">
                <span className="mr-half">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <span className="bolded">{titleCase(job.location)}</span>
              </div>
            )}
            {job.type && (
              <div>
                <span className="mr-half">
                  <i className="far fa-clock"></i>
                </span>
                <span className="bolded">{titleCase(job.type)}</span>
              </div>
            )}
          </div>
          <div>{ReactHtmlParser(job.description)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  job: ownProps.job,
  errors: state.errors
});

export default connect(mapStateToProps, null)(InternalJobItem);
