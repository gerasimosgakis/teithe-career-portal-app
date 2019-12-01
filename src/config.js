export default {
  // s3: {
  //   REGION: "us-east-1",
  //   BUCKET: "may-devpals-uploads"
  // },
  s3: {
    REGION: "us-east-1",
    BUCKET: "career-portal-uploads",
    MAX_ATTACHMENT_SIZE: 5000000
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://j1saro5t70.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_QsQ9bNee8",
    APP_CLIENT_ID: "3pl21u12575tsa8oaqjfsu69fi",
    // IDENTITY_POOL_ID: "us-east-1:2cf76d33-d471-460d-8468-ec9fc00aaacf"
    IDENTITY_POOL_ID: "us-east-1:ee28d9dc-6676-452e-90ac-c74db5bf1eb6"
  }
};
