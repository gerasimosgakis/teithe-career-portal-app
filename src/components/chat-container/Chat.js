import React, { Component } from "react";
import { ChatkitProvider, TokenProvider } from "@pusher/chatkit-client-react";
import Chatkit from "@pusher/chatkit-server";
import { API } from "aws-amplify";
import UserList from "./UserList";
import Messages from "./Messages";
import TextFieldGroup from "../shared/TextFieldGroup";
// import "./Chat.scss";
// Chatkit constants
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
      show: true
    };
  }
  createUser = (userId, userName) => {
    chatkit
      .createUser({
        id: userId,
        name: userName
      })
      .then(currentUser => {
        console.log(currentUser);
        // this.setState({
        //   currentUsername: username,
        //   currentId: username,
        //   currentView: "chatApp"
        // });
      })
      .catch(err => {
        if (err.status === 400) {
          console.log(err);
          // this.setState({
          //   currentUsername: username,
          //   currentId: username,
          //   currentView: "chatApp"
          // });
        } else {
          console.log(err.status);
        }
      });
  };

  async componentDidMount() {
    try {
      const profiles = await API.get("teithe-career-portal-api", "/profiles");
      const users = [];
      if (profiles[0].id !== this.props.userId) {
        this.setState({ otherUserId: profiles[0].id });
      } else {
        this.setState({ otherUserId: profiles[1].id });
      }
      profiles.map(profile => {
        if (profile.id === this.props.userId) {
          this.setState({
            currentUserName: profile.handle
          });
        }
        const userId = profile.id;
        const userName = profile.name;
        this.createUser(userId, userName);
        users.push({
          id: profile.id,
          handle: profile.handle,
          name: profile.name,
          email: profile.email
        });
      });
      this.setState({ users });
    } catch (error) {
      console.log(error);
    }
  }

  handleChildClick = id => {
    this.setState({ otherUserId: id, show: false });
    setTimeout(() => {
      this.setState({ show: true });
    }, 200);
  };

  findUser = userId => {
    return this.state.users.filter(user => user.id === userId)[0];
  };

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
    return (
      <div className="Chat">
        <div className="Chat__chatwindow">
          <div className="Chat__chatwindow-users">
            <div className="Chat__chatwindow-users-search">
              <input
                className="form-control Chat__chatwindow-users-search-input"
                type="text"
                onKeyPress={this.onUserSearch}
              />
              <span className="Chat__chatwindow-users-search-icon">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {/* <TextFieldGroup onKeyPress={this.onUserSearch}></TextFieldGroup> */}
            <UserList
              userName={this.state.currentUserName}
              otherUserId={this.state.otherUserId}
              users={
                this.state.searchUsers
                  ? this.state.searchUsers
                  : this.state.users
              }
              onClick={this.handleChildClick}
            />
          </div>

          {this.state.otherUserId && this.state.show && this.state.users ? (
            <ChatkitProvider
              instanceLocator={instanceLocator}
              tokenProvider={tokenProvider}
              userId={this.props.userId}
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
    );
  }
}

export default Chat;
