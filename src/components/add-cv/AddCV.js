import React, { Component } from "react";
import CVForm from "./CVForm";
import { API, Storage } from "aws-amplify";
import { connect } from "react-redux";
import CVFormNew from "./CVFormNew";
import config from "../../config";
import { s3Upload } from "../../shared/functions/aws";
import Spinner from "../shared/Spinner";

class AddCV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cvURL: null,
      file: null,
      user: this.props.auth.user.username,
      saved: false,
      loading: false
    };
  }

  validateForm = filename => {
    return (
      filename.endsWith(".pdf") ||
      filename.endsWith(".doc") ||
      filename.endsWith(".docx") ||
      filename.endsWith(".odt") ||
      filename.endsWith(".txt")
    );
  };

  handleFileChange = event => {
    this.setState({ file: event.target.files[0] });
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (!this.validateForm(this.state.file.name)) {
      alert("This is not a valid type of file...");
      return;
    }
    this.setState({ loading: true });
    if (this.state.file && this.state.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    try {
      await s3Upload(this.state.file, this.state.user);
      // file = null;
      this.setState({ saved: true, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      alert(error);
    }
  };

  listCVs = async () => {
    console.log(this.props.auth.user.username);
    const cvURL = await Storage.get(this.props.auth.user.username);
    this.setState({ cvURL });
  };

  // downloadFile = () => {
  //   // const data = new Blob([this.state.cvURL], { type: "text/csv" });
  //   // const csvURL = window.URL.createObjectURL(data);
  //   // const tempLink = document.createElement("a");
  //   // tempLink.href = csvURL;
  //   // tempLink.setAttribute("download", "filename.csv");
  //   // tempLink.click();
  //   return new Blob([this.state.cvURL], { type: "text/csv" });
  // };

  render() {
    return (
      <div className="contain">
        {/* <CVFormNew user={this.props.auth.user.username}></CVFormNew> */}
        <div>
          {this.state.loading ? (
            <Spinner></Spinner>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <input
                type="file"
                className="inputfile mr2"
                onChange={this.handleFileChange}
              />
              <div className="btn-group right mt-half">
                <button className="button submit-btn">Submit</button>
              </div>
            </form>
          )}
        </div>
        {this.state.saved && <button onClick={this.listCVs}>Show cvs</button>}
        {this.state.cvURL && (
          <a href={this.state.cvURL} target="_blank">
            View
          </a>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AddCV);
