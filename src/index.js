import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "aws-amplify";
import config from "./config";
import { BrowserRouter as Router } from "react-router-dom";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      // {
      //   name: "april-devpals-app-api",
      //   endpoint: config.apiGateway.URL,
      //   region: config.apiGateway.REGION
      // }
      {
        name: "teithe-career-portal-api",
        endpoint: "http://localhost:3000",
        region: config.apiGateway.REGION
      }
    ]
  }
});

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
