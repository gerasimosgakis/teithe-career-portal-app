import React, { Component } from "react";
import config from "../../config";
import { s3Upload } from "../../shared/functions/aws";
import { connect } from "react-redux";
import Spinner from "../shared/Spinner";

class CVFormNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      user: this.props.auth.user.username,
      loading: false
    };
  }

  handleFileChange = event => {
    // file.current = event.target.files[0];
    this.setState({ file: event.target.files[0] });
  };

  handleSubmit = async event => {
    event.preventDefault();
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
      this.setState({ file: null, loading: false });
      alert("saved");
    } catch (error) {
      this.setState({ loading: false });
      alert(error);
    }
  };

  render() {
    return (
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
            <button className="button submit-btn">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(CVFormNew);
