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
    const { profiles, loading } = this.props.profiles; // retrieves profiles and loading status from redux
    let profileItems; // variable to store the content to display

    if (profiles === null || loading) {
      // If there are no profiles, show the spinner
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        // If there are profiles display them
        profileItems = (
          <div className="flex">
            {profiles.map(
              profile =>
                profile.type !== "recruiter" && ( // Makes sure we don't show recruiters profiles
                  <div key={profile.id} className="profile__item">
                    <ProfileItem profile={profile} />
                  </div>
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
        <h1 className="display-4 text-center">Alumni Profiles</h1>{" "}
        <p className="lead text-center">
          Browse and connect with alumni students{" "}
        </p>
        <Search></Search>
        <hr />
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
