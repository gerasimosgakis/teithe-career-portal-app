import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "aws-amplify";
import config from "./config";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";

// Amplify configuration
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
      //   name: "teithe-career-portal-api",
      //   endpoint: "http://localhost:3001",
      //   region: config.apiGateway.REGION
      // },
      // {
      //   name: "teithe-career-portal-api-part-2",
      //   endpoint: "http://localhost:3002",
      //   region: config.apiGateway.REGION
      // }
      // prod environment
      {
        name: "teithe-career-portal-api",
        endpoint: "http://localhost:3001",
        region: config.apiGateway.REGION
      },
      {
        name: "teithe-career-portal-api-part-2",
        endpoint: "https://vka3j9daw5.execute-api.us-east-1.amazonaws.com/dev",
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
