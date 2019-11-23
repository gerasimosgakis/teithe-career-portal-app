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
  graduate_date_after: "",
  company: "",
  status: "",
  skills: "",
  degree: "",
  expandFields: false
};

let expandFields = false;
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onSubmit = e => {
    e.preventDefault();
    const searchData = {
      handle: this.state.handle.toLowerCase(),
      name: this.state.name.toLowerCase(),
      school: this.state.school.toLowerCase(),
      graduate_date_before: this.state.graduate_date_before,
      graduate_date_after: this.state.graduate_date_after,
      company: this.state.company.toLowerCase(),
      status: this.state.status.toLowerCase(),
      skills: this.state.skills.toLowerCase(),
      degree: this.state.degree.toLowerCase()
    };
    searchData.graduate_date_before = moment(
      this.state.graduate_date_before
    ).toDate();
    searchData.graduate_date_after = moment(
      this.state.graduate_date_after
    ).toDate();
    this.props.searchGraduates(searchData);
    this.setState({ ...initialState });
  };

  getAllProfiles = () => {
    this.props.getProfiles();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  onExpand = () => {
    this.setState({ expandFields: !this.state.expandFields });
  };

  render() {
    return (
      <div>
        <h2>
          Search{" "}
          <button
            type="button"
            className="icon-button icon-button--small"
            onClick={this.onExpand}
          >
            <i
              className={
                this.state.expandFields
                  ? "fa fa-chevron-up"
                  : "fa fa-chevron-down"
              }
              aria-hidden="true"
            ></i>
          </button>
        </h2>

        <form className="mt1 mb2" onSubmit={this.onSubmit}>
          <div className="flex">
            <div className="flex-grow">
              <div className="form__field-label">Name</div>
              <TextFieldGroup
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              ></TextFieldGroup>
            </div>
          </div>
          {this.state.expandFields ? (
            <div>
              <div className="form__field-label">Handle</div>
              <TextFieldGroup
                placeholder="Handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
              ></TextFieldGroup>
              <div className="form__field-label">School</div>
              <TextFieldGroup
                placeholder="School"
                name="school"
                value={this.state.school}
                onChange={this.onChange}
              ></TextFieldGroup>
              <div className="form__field-label">Degree</div>
              <TextFieldGroup
                placeholder="Degree"
                name="degree"
                value={this.state.degree}
                onChange={this.onChange}
              ></TextFieldGroup>
              <div className="form__field-label">Company</div>
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
              ></TextFieldGroup>
              <div className="form__field-label">Skills</div>
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
              ></TextFieldGroup>
              <div className="form__field-label">Graduate Before</div>
              <TextFieldGroup
                placeholder="To"
                name="graduate_date_before"
                type="month"
                value={this.state.graduate_date_before}
                onChange={this.onChange}
              ></TextFieldGroup>
              <div className="form__field-label">Graduate After</div>
              <TextFieldGroup
                placeholder="From"
                name="graduate_date_after"
                type="month"
                value={this.state.graduate_date_after}
                onChange={this.onChange}
              ></TextFieldGroup>
            </div>
          ) : (
            ""
          )}
          <div className="btn-group right">
            {/* <input
              type="button"
              value="Get All"
              className="btn btn-info btn-block mt-4 mb-4"
              onClick={this.getAllProfiles}
            /> */}
            <button
              type="button"
              className="button transparent-btn mr1"
              onClick={this.getAllProfiles}
            >
              Get All
            </button>
            <button className="button submit-btn">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { searchGraduates, getProfiles })(Search);
