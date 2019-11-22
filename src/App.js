import { API } from "aws-amplify";
import { ChatkitProvider, TokenProvider } from "@pusher/chatkit-client-react";
import { default as Chatkit } from "@pusher/chatkit-server";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import "./App.scss";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { Auth } from "aws-amplify";
import Spinner from "./components/shared/Spinner";
import { SET_USER } from "./redux/actions/types";
import gravatar from "gravatar";
import CreateProfile from "./components/create-profile/CreateProfile";
import AddExperience from "./components/add-experience/AddExperience";
import Chat from "./components/chat/Chat";
import AppliedRoute from "./components/AppliedRoute";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  // createUser = username => {
  //   chatkit
  //     .createUser({
  //       id: username,
  //       name: username
  //     })
  //     .then(currentUser => {
  //       console.log(currentUser);
  //       this.setState({
  //         currentUsername: username,
  //         currentId: username,
  //         currentView: "chatApp"
  //       });
  //     })
  //     .catch(err => {
  //       if (err.status === 400) {
  //         this.setState({
  //           currentUsername: username,
  //           currentId: username,
  //           currentView: "chatApp"
  //         });
  //       } else {
  //         console.log(err.status);
  //       }
  //     });
  // };

  async componentDidMount() {
    try {
      // Gets the current user
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();

      this.userHasAuthenticated(true); // If the above succeeds it calls userHasAuthenticated function
      const avatar = gravatar.url(currentAuthenticatedUser.attributes.email, {
        s: "30", // size
        r: "pg", // rating
        d: "mm" //default
      });
      currentAuthenticatedUser.avatar = avatar;
      store.dispatch({
        type: SET_USER,
        payload: currentAuthenticatedUser
      });
      this.setState({ userId: currentAuthenticatedUser.username });
      // try {
      //   const profiles = await API.get("teithe-career-portal-api", "/profiles");
      //   console.log(profiles);
      //   profiles.map(profile => {
      //     const currentUserId = profile.handle;
      //     this.createUser(currentUserId);
      //   });
      //   // const currentUserEmail = "test@test.com";
      //   // this.createUser(
      //   //   currentUserEmail.slice(0, currentUserEmail.indexOf("@"))
      //   // );
      // } catch (error) {
      //   console.log(error);
      // }
    } catch (error) {
      if (error !== "No current user") console.log(error);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  render() {
    return (
      this.state.isAuthenticating && <Spinner />,
      !this.state.isAuthenticating && (
        <Provider store={store}>
          <div className="App">
            <Navbar
              isAuthenticated={this.state.isAuthenticated}
              onAuthChange={this.userHasAuthenticated}
            />
            <div className="main-content">
              <Route exact path="/" component={Landing} />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/create-profile"
                  component={() => (
                    <CreateProfile header={true}></CreateProfile>
                  )}
                ></Route>
                <Route exact path="/graduates" component={Profiles} />
                <Route exact path="/graduates/:handle" component={Profile} />
                <Route exact path="/profile" component={Profile} />
                <AppliedRoute
                  exact
                  path="/chat"
                  props={{ userId: this.state.userId }}
                  component={Chat}
                />
                <Route exact path="/feed" component={Posts} />
                <Route exact path="/post/:id" component={Post} />
                <Route exact path="/create-profile" component={CreateProfile} />
                {/* <Route exact path="/add-experience" component={AddExperience} /> */}
                {/* <Route exact path="/add-experience" component={AddExperience} /> */}
              </Switch>
            </div>
          </div>
          {/* {this.state.isAuthenticated ? (
            <ChatkitProvider
              instanceLocator={instanceLocator}
              tokenProvider={tokenProvider}
              userId={userId}
            >
              <UserList userId={userId} />
              <Chat otherUserId={otherUserId} />
            </ChatkitProvider>
          ) : (
            ""
          )} */}
        </Provider>
      )
    );
  }

  // <Provider store={store}>
  //   <Router>
  //     <Fragment>
  //       <Navbar />
  //       <Route exact path="/" component={Landing} />
  //       <section className="container">
  //         <Switch>
  //           <Route exact path="/register" component={Register} />
  //           <Route exact path="/login" component={Login} />
  //         </Switch>
  //       </section>
  //     </Fragment>
  //   </Router>
  // </Provider>
}

export default App;
