import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ChatkitProvider, TokenProvider } from "@pusher/chatkit-client-react";
import Chatkit from "@pusher/chatkit-server";
import { API } from "aws-amplify";
import UserList from "./UserList";
import Messages from "./Messages";
import Spinner from "../shared/Spinner";
const instanceLocator = "v1:us1:57ccaf34-e6f3-4a0e-af85-44768690c634";

const tokenProvider = new TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/57ccaf34-e6f3-4a0e-af85-44768690c634/token"
});

const chatkit = new Chatkit({
  instanceLocator,
  key:
    "2e26f15d-4dd7-4109-85bc-c2ae11f4e849:O06tWtFfsCeGkkCiYbCTjUxjurTYa7xlsD0Xl4jB2D0="
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserName: "",
      otherUserId: "",
      users: [],
      searchUsers: null,
      show: true,
      loading: true
    };
  }

  /**
   * Creates user
   * @param {*} userId
   * @param {*} userName
   */
  createChatUser = (userId, userName) => {
    chatkit
      .createUser({
        id: userId,
        name: userName
      })
      .then(currentUser => {})
      .catch(err => {
        if (err.status === 400) {
          return;
        } else {
          return;
        }
      });
  };

  async componentDidMount() {
    const { auth } = this.props;
    try {
      const profiles = await API.get("teithe-career-portal-api", "/profiles");
      const users = [];
      if (profiles[0].id !== auth.user.username) {
        this.setState({ otherUserId: profiles[0].id });
      } else {
        this.setState({ otherUserId: profiles[1].id });
      }
      profiles.forEach(profile => {
        if (profile.id === auth.user.username) {
          this.setState({
            currentUserName: profile.handle
          });
        }
        const userId = profile.id;
        const userName = profile.name;
        if (userId && typeof userId === "string") {
          this.createChatUser(userId, userName);
          users.push({
            id: profile.id,
            handle: profile.handle,
            name: profile.name,
            email: profile.email
          });
        }
      });
      this.setState({ users, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Handles User Click
   * On User click sets the user in the state
   * @param {*} id - user id
   */
  handleUserClick = id => {
    this.setState({ otherUserId: id, show: false });
    setTimeout(() => {
      this.setState({ show: true });
    }, 200);
  };

  /**
   * Helper function to find the user in the state
   * @param {*} userId - the id of the user to find
   */
  findUser = userId => {
    return this.state.users.filter(user => user.id === userId)[0];
  };

  /**
   * Searches for user when we type the name in the search field
   */
  onUserSearch = event => {
    if (event.key === "Enter") {
      if (
        this.state.users.filter(user =>
          user.name.startsWith(event.target.value)
        ).length <= 0
      ) {
        return;
      }
      this.setState({
        searchUsers: this.state.users.filter(user =>
          user.name.startsWith(event.target.value)
        ),
        otherUserId: this.state.users.filter(user =>
          user.name.startsWith(event.target.value)
        )[0].id,
        show: false
      });

      setTimeout(() => {
        this.setState({ show: true });
      }, 200);
    }
  };

  render() {
    const { auth } = this.props;
    return (
      <div>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className="chat">
            <div className="chat__users">
              {((this.state.users && this.state.users.length > 0) ||
                (this.state.searchUsers &&
                  this.state.searchUsers.length > 0)) && (
                <div className="chat__users-search">
                  <input
                    className="form-control chat__users-search-input"
                    type="text"
                    onKeyPress={this.onUserSearch}
                  />
                  <span className="chat__users-search-icon">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              )}
              <UserList
                userName={auth.user.username}
                otherUserId={this.state.otherUserId}
                users={
                  this.state.searchUsers
                    ? this.state.searchUsers
                    : this.state.users
                }
                onClick={this.handleUserClick}
              />
            </div>
            <div className="chat__chatwindow">
              {auth.user.username &&
              this.state.otherUserId &&
              this.state.show &&
              this.state.users ? (
                <ChatkitProvider
                  instanceLocator={instanceLocator}
                  tokenProvider={tokenProvider}
                  userId={auth.user.username}
                >
                  <Messages
                    otherUserId={this.state.otherUserId}
                    user={this.findUser(this.state.otherUserId)}
                  />
                </ChatkitProvider>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Chat.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(Chat);
