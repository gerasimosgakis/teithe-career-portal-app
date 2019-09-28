// import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// // import { Link } from "react-router-dom";
// import ProfileHeader from "./ProfileHeader";
// import ProfileAbout from "./ProfileAbout";
// // import ProfileCreds from "./ProfileCreds";
// import ProfileGithub from "./ProfileGithub";
// import ProfileSkills from "./ProfileSkills";
// import Spinner from "../common/Spinner";
// import { getProfileByHandle } from "../../redux/actions/profileActions";

// class Profile extends Component {
//   componentDidMount() {
//     console.log(this.props.match.params.handle);
//     if (this.props.match.params.handle) {
//       this.props.getProfileByHandle(this.props.match.params.handle);
//     }
//   }

//   UNSAFE_componentWillReceiveProps(nextProps) {
//     if (nextProps.profile.profile === null) {
//       this.props.history.push("/not-found");
//     }
//   }

//   render() {
//     const { profile, loading } = this.props.profile;
//     let profileContent;

//     if (profile === null || loading) {
//       profileContent = <Spinner />;
//     } else {
//       profileContent = (
//         <div>
//           {/* <Link to="/profiles" className="btn btn-light mb-3 float-left">
//                 Back To Profiles
//               </Link> */}

//           <ProfileHeader profile={profile} />
//           <ProfileAbout profile={profile} />
//           {/* <ProfileCreds
//             education={profile.eduData}
//             experience={profile.expData}
//           /> */}
//           <ProfileSkills profile={profile} />
//           {profile.githubusername ? (
//             <ProfileGithub username={profile.githubusername} />
//           ) : null}
//         </div>
//       );
//     }

//     return <div>{profileContent}</div>;
//   }
// }

// Profile.propTypes = {
//   getProfileByHandle: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   profile: state.profile
// });

// export default connect(
//   mapStateToProps,
//   { getProfileByHandle }
// )(Profile);
