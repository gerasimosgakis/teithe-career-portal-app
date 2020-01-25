import React, { Component } from "react";
import { connect } from "react-redux";
import config from "../../config";
import { s3Upload } from "../../shared/functions/aws";
import Spinner from "../shared/Spinner";
import { addCVToProfile } from "../../redux/actions/profileActions";

class AddCV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cvName: null,
      cvURL: null,
      file: null,
      user: this.props.auth.user ? this.props.auth.user.username : null,
      saved: false,
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
      this.setState({ saved: true, loading: false });
      this.props.addCVToProfile(
        this.state.user,
        this.state.file.name,
        this.state.user
      );
    } catch (error) {
      this.setState({ loading: false });
      alert(error);
    }
  };

  render() {
    return (
      <div className="contain">
        <div>
          {this.state.loading ? (
            <Spinner></Spinner>
          ) : (
            <form className="d-flex" onSubmit={this.handleSubmit}>
              <input
                type="file"
                className="inputfile mr2"
                onChange={this.handleFileChange}
              />
              {/* <div className="btn-group right mt-half"> */}
              <button className="button submit-btn">Submit</button>
              {/* </div> */}
            </form>
          )}
        </div>
        {this.state.saved && (
          <p className="mt4 text-center">
            <i className="fas fa-check-circle green-text"></i> The cv has been
            successfully submitted.
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addCVToProfile })(AddCV);
