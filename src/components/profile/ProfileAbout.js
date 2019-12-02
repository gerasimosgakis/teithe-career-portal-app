import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/isEmpty";
import { s3GetURL, getCV } from "../../shared/functions/aws";
import { withRouter } from "react-router-dom";
class ProfileAbout extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    console.log(await s3GetURL("79cba60d-8463-4015-92da-091384babbff"));
    // console.log(url);
  }

  // getCV = async key => {
  //   const url = await s3GetURL(key);
  //   window.open(url, "_blank");
  // };

  render() {
    const { profile } = this.props;

    console.log(profile);

    // Get first name
    const firstName = profile.name.trim().split(" ")[0];

    // Skill List
    // const skills = profile.skills.map((skill, index) => (
    //   <div key={index} className="p-3">
    //     <i className="fa fa-check" /> {skill}
    //   </div>
    // ));

    return (
      // <div className="row">
      //   <div className="col-md-12">
      //     <div className="card card-body bg-light mb-3">
      //       <h3 className="text-center text-info">{firstName}'s Bio</h3>
      // <p className="lead">
      //   {isEmpty(profile.bio) ? (
      //     <span>{firstName} does not have a bio</span>
      //   ) : (
      //     <span>{profile.bio}</span>
      //   )}
      // </p>
      // <hr />
      //       <h3 className="text-center text-info">Skill Set</h3>
      //       <div className="row">
      //         <div className="d-flex flex-wrap justify-content-center align-items-center">
      //           {skills}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="profile-about contain">
        <p className="lead">
          {isEmpty(profile.bio) ? (
            <span>{firstName} does not have a bio</span>
          ) : (
            <span>{profile.bio}</span>
          )}
        </p>
        {profile.cv_name && (
          <div>
            {/* <a href={profile.cv_url} target="_blank">
              <i className="fas fa-download"></i> Download CV
            </a> */}
            <button
              className="icon-button icon-button--small"
              onClick={() => getCV(profile.cv_url)}
            >
              <i className="fas fa-download"></i> Download CV
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default withRouter(ProfileAbout);
