import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import AddExperience from "../add-experience/AddExperience";
import AddEducation from "../add-education/AddEducation";
import {
  deleteExperience,
  deleteEducation,
  clearSuccess
} from "../../../redux/actions/profileActions";
import titleCase from "../../../shared/functions/titleCase";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import SuccessIcon from "../../shared/SuccessIcon";

class ProfileCreds extends Component {
  constructor(props) {
    super(props);

    const { experience, education, userId } = this.props;

    // Add the experience details into the state
    // currentExperienceIndex and currentEducationIndex are used for passing it into the AddExperience and AddEducation components respectively. It stores the index of the item to be edited, or if it is -1, it means we add
    this.state = {
      exp_userId: userId,
      exp_id: experience && experience.length > 0 ? experience[0].id : null,
      exp_current:
        experience && experience.length > 0 ? experience[0].current : null,
      exp_location:
        experience && experience.length > 0 ? experience[0].location : null,
      exp_description:
        experience && experience.length > 0 ? experience[0].description : null,
      exp_title:
        experience && experience.length > 0 ? experience[0].title : null,
      exp_start_date:
        experience && experience.length > 0 ? experience[0].start_date : null,
      exp_end_date:
        experience && experience.length > 0 ? experience[0].end_date : null,
      exp_company:
        experience && experience.length > 0 ? experience[0].company : null,
      currentExperienceIndex: -1,
      edu_userId: userId,
      edu_id: education && education.length > 0 ? education[0].id : null,
      edu_current:
        education && education.length > 0 ? education[0].current : null,
      edu_fieldofstudy:
        education && education.length > 0 ? education[0].fieldofstudy : null,
      edu_description:
        education && education.length > 0 ? education[0].description : null,
      edu_degree:
        education && education.length > 0 ? education[0].degree : null,
      edu_start_date:
        education && education.length > 0 ? education[0].start_date : null,
      edu_end_date:
        education && education.length > 0 ? education[0].end_date : null,
      edu_school:
        education && education.length > 0 ? education[0].school : null,
      currentEducationIndex: -1
    };
  }

  /**
   * On Delete Experience
   * Show confirm modal and call the delete experience function
   * @param {*} id - The experience id
   */
  onDeleteExperience(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui card card-body text-center">
            <h2>Are you sure?</h2>
            <p>You want to delete this experience?</p>
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
                  this.props.deleteExperience(id);
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

  /**
   * On Delete Education
   * Show confirm modal and call the delete education function
   * @param {*} id - The education id
   */
  onDeleteEducation(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui card card-body text-center">
            <h2>Are you sure?</h2>
            <p>You want to delete this education?</p>
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
                  this.props.deleteEducation(id);
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

  render() {
    let experienceContent;
    if (this.props.success) {
      experienceContent = <SuccessIcon />;
    }
    const { experience, education, edit } = this.props;
    const expItems = experience.map((exp, index) => (
      <li key={index} className="list-group-item profile-creds__cred">
        <div className="profile-creds__cred-info">
          <div className="profile-creds__cred-info-icon">
            <i className="fa fa-briefcase fa-3x" />
          </div>
          <span className="profile-creds__cred-info-details">
            <p>
              {titleCase(exp.title)}{" "}
              {/* Button to open experience modal and update the state with the details of the item or the fallback value */}
              {edit && ( // Show it only if it is the current user's profile
                <span>
                  <button
                    className="icon-button"
                    data-toggle="modal"
                    data-target="#expModal"
                    onClick={() => {
                      this.props.onModalOpen();
                      this.setState({
                        exp_userId: this.props.userId || "",
                        exp_id: this.props.experience[index].id || "",
                        exp_current:
                          this.props.experience[index].current || false,
                        exp_location:
                          this.props.experience[index].location || "",
                        exp_description:
                          this.props.experience[index].description || "",
                        exp_title: this.props.experience[index].title || "",
                        exp_start_date:
                          this.props.experience[index].start_date || "",
                        exp_end_date:
                          this.props.experience[index].end_date || "",
                        exp_company: this.props.experience[index].company || "",
                        currentExperienceIndex: index
                      });
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </button>

                  {/* Opens on delete confirmation modal */}
                  <button
                    className="icon-button icon-button--danger"
                    onClick={() => {
                      this.onDeleteExperience(exp.id);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </span>
              )}
            </p>
            <p>{titleCase(exp.company)}</p>
            <p className="help-text">
              <Moment format="MMMM YYYY">{exp.start_date}</Moment> -{" "}
              {exp.end_date === null ? (
                "Present"
              ) : (
                <Moment format="MMMM YYYY">{exp.end_date}</Moment>
              )}
            </p>
            <p className="help-text">{exp.location}</p>
          </span>
        </div>
        <div className="profile-creds__cred-info-description">
          {exp.description}
        </div>
      </li>
    ));

    const eduItems = education.map((edu, index) => (
      <li key={edu.id} className="list-group-item profile-creds__cred">
        <div className="profile-creds__cred-info">
          <div className="profile-creds__cred-info-icon">
            <i className="fas fa-graduation-cap fa-3x" />
          </div>
          <span className="profile-creds__cred-info-details">
            <p>
              {titleCase(`${edu.degree.trim()}`)}
              {", "}
              {titleCase(`${edu.fieldofstudy.trim()}`)}
              {/* Button to open education modal and update the state with the details of the item or the fallback value */}
              {edit && ( // Show it only if it is the current user's profile
                <span>
                  <button
                    className="icon-button"
                    data-toggle="modal"
                    data-target="#eduModal"
                    onClick={() => {
                      this.props.onModalOpen();
                      this.setState({
                        edu_userId: this.props.user_id || "",
                        edu_id: this.props.education[index].id || "",
                        edu_current:
                          this.props.education[index].current || false,
                        edu_school: this.props.education[index].school || "",
                        edu_description:
                          this.props.education[index].description || "",
                        edu_degree: this.props.education[index].degree || "",
                        edu_start_date:
                          this.props.education[index].start_date || "",
                        edu_end_date:
                          this.props.education[index].end_date || "",
                        edu_fieldofstudy:
                          this.props.education[index].fieldofstudy || "",
                        currentEducationIndex: index
                      });
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  {/* Opens on delete confirmation modal */}
                  <button
                    className="icon-button icon-button--danger"
                    onClick={() => {
                      this.onDeleteEducation(edu.id);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </span>
              )}
            </p>
            <p>{titleCase(edu.school)}</p>
            <p className="help-text">
              <Moment format="MMMM YYYY">{edu.start_date}</Moment> -{" "}
              {edu.end_date === null ? (
                "Present"
              ) : (
                <Moment format="MMMM YYYY">{edu.end_date}</Moment>
              )}
            </p>
          </span>
        </div>
        <div className="profile-creds__cred-info-description">
          {edu.description}
        </div>
      </li>
    ));

    return (
      <div className="profile-creds">
        <div className="d-flex justify-space-between">
          <h3>
            Experience <span>&nbsp;</span>
          </h3>
          {/* Show the button only if it is the current user's profile */}
          {edit && (
            <button
              className="btn transparent-btn"
              data-toggle="modal"
              data-target="#expModal"
              onClick={() => {
                this.props.onModalOpen();
                this.setState({
                  currentExperienceIndex: -1
                });
              }}
            >
              <i className="fas fa-plus"></i> Add New
            </button>
          )}
        </div>
        {expItems.length > 0 ? (
          <ul className="list-group">{expItems}</ul>
        ) : (
          <p className="text-center">No Experience Listed</p>
        )}
        <div className="d-flex justify-space-between">
          <h3>
            Education <span>&nbsp;</span>
          </h3>
          {edit && (
            <button
              className="btn transparent-btn"
              data-toggle="modal"
              data-target="#eduModal"
              onClick={() => {
                this.props.onModalOpen();
                this.setState({
                  currentEducationIndex: -1
                });
              }}
            >
              <i className="fas fa-plus"></i> Add New
            </button>
          )}
        </div>
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
                <h4 className="modal-title">
                  {this.state.currentExperienceIndex >= 0
                    ? "Edit Experience"
                    : "Add Experience"}
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {this.props.success ? (
                  <SuccessIcon />
                ) : this.state.currentExperienceIndex >= 0 ? ( // Checks if we are editing
                  // If yes, provides the details to the AddExperience component
                  <AddExperience
                    small={true}
                    userId={this.props.userId}
                    id={this.state.exp_id}
                    current={this.state.exp_current}
                    _location={this.state.exp_location}
                    description={this.state.exp_description}
                    title={this.state.exp_title}
                    start_date={this.state.exp_start_date}
                    end_date={this.state.exp_end_date}
                    company={this.state.exp_company}
                    currentExperienceIndex={this.state.currentExperienceIndex}
                  ></AddExperience>
                ) : (
                  // If not, passes initial values
                  <AddExperience
                    small={true}
                    userId={this.props.userId}
                    id={""}
                    current={false}
                    _location={""}
                    description={""}
                    title={""}
                    start_date={""}
                    end_date={""}
                    company={""}
                  ></AddExperience>
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

        {/* Education Edit Modal */}
        <div className="modal fade" id="eduModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  {this.state.currentEducationIndex >= 0
                    ? "Edit Education"
                    : "Add Education"}
                </h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {this.props.success ? (
                  <SuccessIcon />
                ) : this.state.currentEducationIndex >= 0 ? ( // Checks if we are editing
                  // If yes, provides the details to the AddEducation component
                  <AddEducation
                    small={true}
                    userId={this.props.userId}
                    id={this.state.edu_id}
                    current={this.state.edu_current}
                    school={this.state.edu_school}
                    description={this.state.edu_description}
                    degree={this.state.edu_degree}
                    start_date={this.state.edu_start_date}
                    end_date={this.state.edu_end_date}
                    fieldofstudy={this.state.edu_fieldofstudy}
                    currentEducationIndex={this.state.currentEducationIndex}
                  ></AddEducation>
                ) : (
                  // If not, passes initial values
                  <AddEducation
                    small={true}
                    userId={this.props.userId}
                    id={""}
                    current={false}
                    school={""}
                    description={""}
                    degree={""}
                    start_date={""}
                    end_date={""}
                    fieldofstudy={""}
                  ></AddEducation>
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

ProfileCreds.propTypes = {
  userId: PropTypes.string.isRequired,
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
  edit: PropTypes.bool
};

export default connect(null, {
  deleteExperience,
  deleteEducation,
  clearSuccess
})(ProfileCreds);
