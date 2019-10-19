import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp.id} className="list-group-item profile-creds__cred">
        <div className="profile-creds__cred-info">
          <div className="profile-creds__cred-info-icon">
            <i className="fa fa-briefcase fa-3x" />
          </div>
          <span className="profile-creds__cred-info-details">
            <p>{exp.title}</p>
            <p>{exp.company}</p>
            <p className="help-text">
              <Moment format="MMMM YYYY">{exp.from}</Moment> -{" "}
              {exp.to === null ? (
                "Now"
              ) : (
                <Moment format="MMMM YYYY">{exp.to}</Moment>
              )}
            </p>
          </span>
        </div>
        <div className="profile-creds__cred-info-description">
          {exp.description}
        </div>
      </li>
      // <li key={exp._id} className="list-group-item">
      //   <h4>{exp.company}</h4>
      // <p>
      //   <Moment format="MMMM YYYY">{exp.from}</Moment> -{" "}
      //   {exp.to === null ? (
      //     "Now"
      //   ) : (
      //     <Moment format="MMMM YYYY">{exp.to}</Moment>
      //   )}
      // </p>
      // <p>
      //   <strong>Position:</strong> {exp.title}
      // </p>
      //   <p>
      //     {exp.location === "" ? null : (
      //       <span>
      //         <strong>Location:</strong> {exp.location}
      //       </span>
      //     )}
      //   </p>
      //   <p>
      //     {exp.description === "" ? null : (
      //       <span>
      //         <strong>Description:</strong> {exp.description}
      //       </span>
      //     )}
      //   </p>
      // </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu.id} className="list-group-item profile-creds__cred">
        <div className="profile-creds__cred-info">
          <div className="profile-creds__cred-info-icon">
            <i className="fas fa-graduation-cap fa-3x" />
          </div>
          <span className="profile-creds__cred-info-details">
            <p>{edu.degree}</p>
            <p>{edu.school}</p>
            <p className="help-text">
              <Moment format="MMMM YYYY">{edu.from}</Moment> -{" "}
              {edu.to === null ? (
                "Now"
              ) : (
                <Moment format="MMMM YYYY">{edu.to}</Moment>
              )}
            </p>
          </span>
        </div>
        <div className="profile-creds__cred-info-description">
          {edu.description}
        </div>
      </li>
    ));

    // const eduItems = education.map(edu => (
    //   <li key={edu._id}>
    //     <h4>{edu.school}</h4>
    //     <p>
    //       <Moment format="MMMM YYYY">{edu.from}</Moment> -{" "}
    //       {edu.to === null ? (
    //         "Now"
    //       ) : (
    //         <Moment format="MMMM YYYY">{edu.to}</Moment>
    //       )}
    //     </p>
    //     <p>
    //       <strong>Degree:</strong> {edu.degree}
    //     </p>
    //     <p>
    //       <strong>Field of Study:</strong> {edu.fieldofstudy}
    //     </p>
    //     <p>
    //       {edu.description === "" ? null : (
    //         <span>
    //           <strong>Description:</strong> {edu.description}
    //         </span>
    //       )}
    //     </p>
    //   </li>
    // ));

    return (
      <div className="profile-creds contain">
        <h3>
          Experience <span>&nbsp;</span>
          {this.props.edit && (
            <button
              className="modal-button"
              data-toggle="modal"
              data-target="#expModal"
            >
              <i className="fas fa-edit"></i>
            </button>
          )}
        </h3>
        {expItems.length > 0 ? (
          <ul className="list-group">{expItems}</ul>
        ) : (
          <p className="text-center">No Experience Listed</p>
        )}
        <h3>
          Education <span>&nbsp;</span>
          {this.props.edit && (
            <button
              className="modal-button"
              data-toggle="modal"
              data-target="#eduModal"
            >
              <i className="fas fa-edit"></i>
            </button>
          )}
        </h3>
        {eduItems.length > 0 ? (
          <ul className="list-group">{eduItems}</ul>
        ) : (
          <p className="text-center">No Education Listed</p>
        )}

        {/* Experience Edit Modal */}
        <div className="modal fade" id="expModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Experience</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Some text in the modal.</p>
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

        {/* Education Edit Modal */}
        <div className="modal fade" id="eduModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Educations</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Some text in the modal.</p>
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

      // <div className="row">
      //   <div className="col-md-6">
      //     <h3>Experience</h3>
      // {expItems.length > 0 ? (
      //   <ul className="list-group">{expItems}</ul>
      // ) : (
      //   <p className="text-center">No Experience Listed</p>
      // )}
      //   </div>

      //   <div className="col-md-6">
      //     <h3 className="text-center text-info">Education</h3>
      //     {eduItems.length > 0 ? (
      //       <ul className="list-group">{eduItems}</ul>
      //     ) : (
      //       <p className="text-center">No Education Listed</p>
      //     )}
      //   </div>
      // </div>
    );
  }
}

export default ProfileCreds;
