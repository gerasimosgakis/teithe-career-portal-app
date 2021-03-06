import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout-container/Navbar";
import Landing from "./components/layout-container/Landing";
import "./App.scss";
import Login from "./components/auth-container/Login";
import Register from "./components/auth-container/Register";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { Auth } from "aws-amplify";
import Spinner from "./components/shared/Spinner";
import { SET_USER } from "./redux/actions/types";
import Chat from "./components/chat-container/Chat";
import Posts from "./components/posts-container/Posts";
import JobSearch from "./components/job-search-container/JobSearch";
import AddCV from "./components/add-cv-container/AddCV";
import AddJobPost from "./components/internal-jobs-container/add-job-post/AddJobPost";
import InternalJobs from "./components/internal-jobs-container/internal-jobs-search/InternalJobs";
import CreateProfile from "./components/profile-container/create-profile/CreateProfile";
import Profiles from "./components/profile-container/profiles-list/Profiles";
import Profile from "./components/profile-container/profile-dashboard/Profile";
import PrivateRoute from "./components/shared/PrivateRoute";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      userId: ""
    };
  }

  async componentDidMount() {
    try {
      // Gets the current user
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();

      this.userHasAuthenticated(true); // If the above succeeds it calls userHasAuthenticated function
      store.dispatch({
        type: SET_USER,
        payload: currentAuthenticatedUser
      });
      this.setState({ userId: currentAuthenticatedUser.username });
    } catch (error) {
      if (error !== "No current user") console.warn(error);
    }

    this.setState({ isAuthenticating: false });
  }

  /**
   * Sets isAuthenticated in state
   */
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
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={() => (
                    <CreateProfile header={true}></CreateProfile>
                  )}
                />
                <PrivateRoute exact path="/graduates" component={Profiles} />
                <PrivateRoute exact path="/graduates/:id" component={Profile} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute
                  exact
                  path="/chat"
                  component={() => <Chat userId={this.state.userId} />}
                />
                <PrivateRoute exact path="/feed" component={Posts} />
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
                <PrivateRoute exact path="/job-search" component={JobSearch} />
                <PrivateRoute exact path="/add-cv" component={AddCV} />
                <PrivateRoute
                  exact
                  path="/add-job-post"
                  component={AddJobPost}
                />
                <PrivateRoute
                  exact
                  path="/internal-jobs"
                  component={() => (
                    <div className="contain">
                      <InternalJobs header={true} />
                    </div>
                  )}
                />
              </Switch>
            </div>
          </div>
          <footer className="footer text-center mt2 mb2 help-text">
            <div>
              <small>
                &copy; Career Portal {new Date().getFullYear()} | Version 1.0.0
              </small>
            </div>
            <small>Developed by Gerasimos Gakis</small>
          </footer>
        </Provider>
      )
    );
  }
}

export default App;
