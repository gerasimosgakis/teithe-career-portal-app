import React, { Component } from "react";
import CVForm from "./CVForm";
import { API, Storage } from "aws-amplify";
import { connect } from "react-redux";
import CVFormNew from "./CVFormNew";

class AddCV extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cvURL: null
    };
  }

  listCVs = async () => {
    console.log(this.props.auth.user.username);
    const cvURL = await Storage.get(
      "1575115245365-Gerasimos-Gakis-cv-2019.pdf"
    );
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
        <CVFormNew user={this.props.auth.user.username}></CVFormNew>
        <button onClick={this.listCVs}>Show cvs</button>
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
