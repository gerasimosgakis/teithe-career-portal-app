import React, { Component } from "react";
import { ChatkitProvider, TokenProvider } from "@pusher/chatkit-client-react";
import Chatkit from "@pusher/chatkit-server";
import { API } from "aws-amplify";
import UserList from "./UserList";
import Messages from "./Messages";

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
        const userName = profile.handle;
        this.createUser(userId, userName);
        users.push({
          id: profile.id,
          handle: profile.handle
        });
      });
      this.setState({ users });
    } catch (error) {
      console.log(error);
    }
  }

  handleChildClick = id => {
    console.log(id);
    this.setState({ otherUserId: id, show: false });
    setTimeout(() => {
      this.setState({ show: true });
    }, 200);
    console.log(this.state);
  };

  render() {
    return (
      <div>
        {this.state.otherUserId && this.state.show ? (
          <ChatkitProvider
            instanceLocator={instanceLocator}
            tokenProvider={tokenProvider}
            userId={this.props.userId}
          >
            <UserList
              userName={this.state.currentUserName}
              users={this.state.users}
              onClick={this.handleChildClick}
              otherUserId={this.state.otherUserId}
            />
            <Messages otherUserId={this.state.otherUserId} />
          </ChatkitProvider>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Chat;
