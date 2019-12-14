import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../../redux/actions/profileActions";
import Spinner from "../../shared/Spinner";
import Search from "../search-profiles/Search";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles(); // Gets all profiles when the component mounts
  }

  render() {
    const { profiles, loading } = this.props.profiles;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = (
          <div className="flex group-contain">
            {profiles.map(
              profile =>
                profile.type !== "recruiter" && (
                  <ProfileItem key={profile.id} profile={profile} />
                )
            )}
          </div>
        );
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles contain">
        <h1 className="display-4 text-center">Developer Profiles</h1>{" "}
        <p className="lead text-center">Browse and connect with developers </p>
        <Search></Search>
        {profileItems}
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profiles: state.profiles
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
