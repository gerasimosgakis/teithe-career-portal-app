import React, { Component } from "react";
import Moment from "react-moment";
import AddExperience from "../add-experience/AddExperience";
import AddEducation from "../add-education/AddEducation";

class ProfileCreds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exp_userId: this.props.experience[0].user_id,
      exp_id: this.props.experience[0].id,
      exp_current: this.props.experience[0].current,
      exp_location: this.props.experience[0].location,
      exp_description: this.props.experience[0].description,
      exp_title: this.props.experience[0].title,
      exp_start_date: this.props.experience[0].start_date,
      exp_end_date: this.props.experience[0].end_date,
      exp_company: this.props.experience[0].company,
      currentExperienceIndex: null,
      edu_userId: this.props.education[0].user_id,
      edu_id: this.props.education[0].id,
      edu_current: this.props.education[0].current,
      edu_fieldofstudy: this.props.education[0].fieldofstudy,
      edu_description: this.props.education[0].description,
      edu_degree: this.props.education[0].degree,
      edu_start_date: this.props.education[0].start_date,
      edu_end_date: this.props.education[0].end_date,
      edu_school: this.props.education[0].school,
      currentEducationIndex: null
    };
  }

  render() {
    const { experience, education } = this.props;

    const expItems = experience.map((exp, index) => (
      <li key={exp.id} className="list-group-item profile-creds__cred">
        <div className="profile-creds__cred-info">
          <div className="profile-creds__cred-info-icon">
            <i className="fa fa-briefcase fa-3x" />
          </div>
          <span className="profile-creds__cred-info-details">
            <p>
              {exp.title}{" "}
              <button
                className="modal-button"
                data-toggle="modal"
                data-target="#expModal"
                onClick={() => {
                  // this.currentExperienceIndex = index;
                  this.setState({
                    exp_userId: this.props.experience[index].user_id || "",
                    exp_id: this.props.experience[index].id || "",
                    exp_current: this.props.experience[index].current || "",
                    exp_location: this.props.experience[index].location || "",
                    exp_description:
                      this.props.experience[index].description || "",
                    exp_title: this.props.experience[index].title || "",
                    exp_start_date:
                      this.props.experience[index].start_date || "",
                    exp_end_date: this.props.experience[index].end_date || "",
                    exp_company: this.props.experience[index].company || "",
                    currentExperienceIndex: index
                  });
                  // console.log(this.currentExperienceIndex);
                }}
              >
                <i className="fas fa-edit"></i>
              </button>
            </p>
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
    ));

    const eduItems = education.map((edu, index) => (
      <li key={edu.id} className="list-group-item profile-creds__cred">
        <div className="profile-creds__cred-info">
          <div className="profile-creds__cred-info-icon">
            <i className="fas fa-graduation-cap fa-3x" />
          </div>
          <span className="profile-creds__cred-info-details">
            <p>
              {edu.degree}{" "}
              <button
                className="modal-button"
                data-toggle="modal"
                data-target="#eduModal"
                onClick={() => {
                  // this.currentExperienceIndex = index;
                  this.setState({
                    edu_userId: this.props.education[index].user_id || "",
                    edu_id: this.props.education[index].id || "",
                    edu_current: this.props.education[index].current || "",
                    edu_school: this.props.education[index].school || "",
                    edu_description:
                      this.props.education[index].description || "",
                    edu_degree: this.props.education[index].degree || "",
                    edu_start_date:
                      this.props.education[index].start_date || "",
                    edu_end_date: this.props.education[index].end_date || "",
                    edu_fieldofstudy:
                      this.props.education[index].fieldofstudy || "",
                    currentEducationIndex: index
                  });
                  // console.log(this.currentExperienceIndex);
                }}
              >
                <i className="fas fa-edit"></i>
              </button>
            </p>
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
    //   <li key={edu.id} className="list-group-item profile-creds__cred">
    //     <div className="profile-creds__cred-info">
    //       <div className="profile-creds__cred-info-icon">
    //         <i className="fas fa-graduation-cap fa-3x" />
    //       </div>
    //       <span className="profile-creds__cred-info-details">
    //         <p>{edu.degree}</p>
    //         <p>{edu.school}</p>
    //         <p className="help-text">
    //           <Moment format="MMMM YYYY">{edu.from}</Moment> -{" "}
    //           {edu.to === null ? (
    //             "Now"
    //           ) : (
    //             <Moment format="MMMM YYYY">{edu.to}</Moment>
    //           )}
    //         </p>
    //       </span>
    //     </div>
    //     <div className="profile-creds__cred-info-description">
    //       {edu.description}
    //     </div>
    //   </li>
    // ));

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
              onClick={() => {
                // this.currentExperienceIndex = index;
                this.setState({
                  currentExperienceIndex: null
                });
              }}
            >
              <i className="fas fa-plus"></i>
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
              onClick={() => {
                // this.currentExperienceIndex = index;
                this.setState({
                  currentEducationIndex: null
                });
              }}
            >
              <i className="fas fa-plus"></i>
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
                {this.state.currentExperienceIndex >= 0 ? (
                  <AddExperience
                    userId={this.state.exp_userId}
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
                  <AddExperience
                    userId={this.state.exp_userId}
                    id={""}
                    current={false}
                    _location={""}
                    description={""}
                    title={""}
                    start_date={""}
                    end_date={""}
                    company={""}
                    // currentExperienceIndex={null}
                  ></AddExperience>
                )}
                {/* <AddExperience
                  userId={this.state.exp_userId}
                  id={this.state.exp_id}
                  current={this.state.exp_current}
                  _location={this.state.exp_location}
                  description={this.state.exp_description}
                  title={this.state.exp_title}
                  start_date={this.state.exp_start_date}
                  end_date={this.state.exp_end_date}
                  company={this.state.exp_company}
                  currentExperienceIndex={this.state.currentExperienceIndex}
                ></AddExperience> */}
                {/* <AddExperience
                  id={this.state.id}
                  current={this.state.current}
                  _location={this.state.location}
                  description={this.state.description}
                  title={this.state.title}
                  start_date={this.state.start_date}
                  end_date={this.state.end_date}
                  company={this.state.company}
                  currentExperienceIndex={this.state.currentExperienceIndex}
                ></AddExperience> */}
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
                <h4 className="modal-title">Edit Education</h4>
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                {this.state.currentEducationIndex >= 0 ? (
                  <AddEducation
                    userId={this.state.edu_userId}
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
                  <AddEducation
                    userId={this.state.edu_userId}
                    id={""}
                    current={false}
                    school={""}
                    description={""}
                    degree={""}
                    start_date={""}
                    end_date={""}
                    fieldofstudy={""}
                    // currentExperienceIndex={null}
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
