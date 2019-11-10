import React, { Component } from "react";
import TextFieldGroup from "../shared/TextFieldGroup";
import { connect } from "react-redux";
import {
  searchGraduates,
  getProfiles
} from "../../redux/actions/profileActions";
import moment from "moment";

const initialState = {
  handle: "",
  name: "",
  school: "",
  graduate_date_before: "",
  graduate_date_after: ""
};

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onSubmit = e => {
    e.preventDefault();
    const searchData = { ...this.state };
    searchData.graduate_date_before = moment(
      this.state.graduate_date_before
    ).toDate();
    searchData.graduate_date_after = moment(
      this.state.graduate_date_after
    ).toDate();
    console.log(searchData);
    this.props.searchGraduates(searchData);
    this.setState({ ...initialState });
  };

  getAllProfiles = () => {
    this.props.getProfiles();
  };

  onChange = e => {
    console.log(e.target);
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <form className="mt1" onSubmit={this.onSubmit}>
          <TextFieldGroup
            placeholder="Handle"
            name="handle"
            value={this.state.handle}
            onChange={this.onChange}
          ></TextFieldGroup>
          <TextFieldGroup
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          ></TextFieldGroup>
          <TextFieldGroup
            placeholder="School"
            name="school"
            value={this.state.school}
            onChange={this.onChange}
          ></TextFieldGroup>
          {/* <h6>Start Date On or Before</h6>
          <TextFieldGroup
            placeholder="From"
            name="start_date"
            type="month"
            value={this.state.start_date}
            onChange={this.onChange}
          ></TextFieldGroup>
          <h6>End Date On Or After</h6>
          <TextFieldGroup
            placeholder="To"
            name="end_date"
            type="month"
            value={this.state.end_date}
            onChange={this.onChange}
          ></TextFieldGroup> */}

          <h6>Graduate Before</h6>
          <TextFieldGroup
            placeholder="To"
            name="graduate_date_before"
            type="month"
            value={this.state.graduate_date_before}
            onChange={this.onChange}
          ></TextFieldGroup>
          <h6>Graduate After</h6>
          <TextFieldGroup
            placeholder="From"
            name="graduate_date_after"
            type="month"
            value={this.state.graduate_date_after}
            onChange={this.onChange}
          ></TextFieldGroup>
          <input
            type="submit"
            value="Submit"
            className="btn btn-info btn-block mt-4 mb-4"
          />
          <input
            type="button"
            value="Get All"
            className="btn btn-info btn-block mt-4 mb-4"
            onClick={this.getAllProfiles}
          />
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { searchGraduates, getProfiles }
)(Search);
