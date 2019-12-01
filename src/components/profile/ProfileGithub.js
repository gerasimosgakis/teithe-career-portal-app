import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // clientId: "f005b4d40ed078e5d835",
      // clientSecret: "4b08875fa748d87af02f3d4ac5219825c93ef688",
      clientId: "4c266a07904f866928be",
      clientSecret: "6915caf1da4386c52256f4cfd47d9c7cb04e3241",
      count: 5,
      sort: "created: asc",
      repos: []
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
        console.log(data);
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map(repo => (
      // <div key={repo.id} className="card card-body mb-2">
      //   <div className="row">
      //     <div className="col-md-6">
      // <h4>
      //   <Link to={repo.html_url} className="text-info" target="_blank">
      //     {repo.name}
      //   </Link>
      // </h4>
      // <p>{repo.description}</p>
      //     </div>
      //     <div className="col-md-6">
      // <span className="badge badge-info mr-1">
      //   Stars: {repo.stargazers_count}
      // </span>
      // <span className="badge badge-secondary mr-1">
      //   Stars: {repo.watchers_count}
      // </span>
      // <span className="badge badge-success">
      //   Stars: {repo.forks_count}
      // </span>
      //     </div>
      //   </div>
      // </div>
      <div className="profile-github__repo">
        <div className="profile-github__repo-title">
          <i class="fab fa-github fa-2x mr2" />
          <h4>
            <a href={repo.html_url} target="_blank">
              {repo.name}
            </a>
          </h4>
          <p>{repo.description}</p>
        </div>
        <div className="profile-github__repo-info">
          <span className="badge badge-info mr1">
            <i class="fas fa-star mr-half" />
            Star: {repo.stargazers_count}
          </span>
          <span className="badge badge-secondary mr1">
            <i class="far fa-eye mr-half" />
            Watch: {repo.watchers_count}
          </span>
          <span className="badge badge-success">
            <i class="fas fa-code-branch mr-half" />
            Fork: {repo.forks_count}
          </span>
        </div>
      </div>
    ));
    return (
      <div ref="myRef" class="profile-github contain">
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
