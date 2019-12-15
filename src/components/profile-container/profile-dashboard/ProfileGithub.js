import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "4c266a07904f866928be", // Client Id for github api
      clientSecret: "6915caf1da4386c52256f4cfd47d9c7cb04e3241", // Client secret for github api
      count: 5, // Number of latest repos to retrieve
      sort: "created: asc", // Sort details for the repos
      repos: [] // here the repos will be added
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map((repo, index) => (
      <div key={index} className="profile-github__repo">
        <div className="profile-github__repo-title">
          <i className="fab fa-github fa-2x mr2" />
          <h4>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="profile-github__repo-info">
          <span className="badge badge-info mr1">
            <i className="fas fa-star mr-half" />
            Star: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr1">
            <i className="far fa-eye mr-half" />
            Watch: {repo.watchers_count}
          </span>
          <span className="badge badge-success">
            <i className="fas fa-code-branch mr-half" />
            Fork: {repo.forks_count}
          </span>
        </div>
      </div>
    ));
    return (
      <div ref="myRef" className="profile-github contain">
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
