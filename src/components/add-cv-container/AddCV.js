import React, { Component } from "react";
import { connect } from "react-redux";
import config from "../../config";
import { s3Upload } from "../../shared/functions/aws";
import Spinner from "../shared/Spinner";
import { addCVToProfile } from "../../redux/actions/profileActions";
import SuccessIcon from "../shared/SuccessIcon";
import ErrorIcon from "../shared/ErrorIcon";

class AddCV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cvName: null,
      cvURL: null,
      file: null,
      user: this.props.auth.user ? this.props.auth.user.username : null,
      saved: false,
      failed: false,
      loading: false
    };
  }

  /**
   * Secures the file type is one of the allowed ones
   * @param {*} filename
   */
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
    if (!this.state.file) {
      alert("Please choose a file");
      return;
    } else if (!this.validateForm(this.state.file.name)) {
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
      this.setState({ saved: true, loading: false });
      setTimeout(() => {
        this.setState({ saved: false });
      }, 2000);
      this.props.addCVToProfile(
        this.state.user,
        this.state.file.name,
        this.state.user
      );
    } catch (error) {
      this.setState({ failed: true, loading: false });
      setTimeout(() => {
        this.setState({ failed: false });
      }, 2000);
      alert(error);
    }
  };

  render() {
    let content;
    if (this.state.loading) {
      content = <Spinner />;
    } else if (this.state.saved) {
      content = <SuccessIcon text="The CV has been saved" />;
    } else if (this.state.failed) {
      content = (
        <ErrorIcon text="The CV has not been saved. Please try again..." />
      );
    } else {
      content = (
        // File upload Input
        <form className="d-flex" onSubmit={this.handleSubmit}>
          <input
            type="file"
            className="inputfile mr1"
            onChange={this.handleFileChange}
          />
          <button className="button submit-btn">Submit</button>
        </form>
      );
    }
    return <div className="contain">{content}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addCVToProfile })(AddCV);
