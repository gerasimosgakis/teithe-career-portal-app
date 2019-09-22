import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import "./App.scss";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { Auth } from "aws-amplify";
import Spinner from "./components/shared/Spinner";
import Routes from "./Routes";
import { setUser } from "./redux/actions/authActions";
import { SET_USER } from "./redux/actions/types";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentWillMount() {
    try {
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser(); // Gets the current session
      console.log(currentAuthenticatedUser);

      this.userHasAuthenticated(true); // If the above succeeds it calls userHasAuthenticated function
      store.dispatch({
        type: SET_USER,
        payload: currentAuthenticatedUser
      });
    } catch (error) {
      if (error !== "No current user") alert(error);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

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
              </Switch>
            </div>
          </div>
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
