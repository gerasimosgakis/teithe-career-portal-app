import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  registerUser,
  confirmUser,
  setLoading
} from "../../redux/actions/authActions";
import TextFieldGroup from "../shared/TextFieldGroup";
import SelectListGroup from "../shared/SelectListGroup";
import LoadingText from "../shared/LoadingText";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      user: null,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.setLoading(false);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Submits signup form
   */
  onSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.registerUser(newUser);

    this.setState({ isLoading: false });
  };

  /**
   * Submits confirmation form
   */
  onConfirmationSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const userConfirm = {
      email: this.props.auth.username
        ? this.props.auth.username
        : this.props.auth.user.username,
      confirmationCode: this.state.confirmationCode
    };

    this.props.confirmUser(userConfirm, this.props.history);
  };

  // Consfirmation form
  renderConfirmationForm() {
    return (
      <form>
        <TextFieldGroup
          placeholder="Confirmation Code"
          name="confirmationCode"
          type="text"
          value={this.state.confirmationCode}
          onChange={this.onChange}
        />
        <button
          className="register__form-buttons button submit-btn"
          type="button"
          onClick={this.onConfirmationSubmit}
        >
          Submit
        </button>
      </form>
    );
  }

  // Register Form
  renderForm() {
    // Select options for role
    const options = [
      { label: "Select Role", value: 0 },
      { label: "Alumni", value: "alumni" },
      { label: "Recruiter", value: "recruiter" }
    ];
    const { auth } = this.props;
    return (
      <form>
        <div className="form__field-label">Name</div>
        <TextFieldGroup
          placeholder="Name"
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.onChange}
        />
        <div className="form__field-label">Email Address</div>
        <TextFieldGroup
          placeholder="Email Address"
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.onChange}
        />
        <div className="form__field-label">Role</div>
        <SelectListGroup
          placeholder="role"
          name="role"
          value={this.state.role}
          options={options}
          required
          onChange={this.onChange}
        />
        <div className="form__field-label">Password</div>
        <TextFieldGroup
          placeholder="Password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.onChange}
        />
        <div className="form__field-label">Confirm Password</div>
        <TextFieldGroup
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.onChange}
        />
        <div className="btn-group right">
          <Link to="/" className="button button--wide back-btn mr-1">
            Back
          </Link>
          <button
            className="button button--wide submit-btn"
            type="button"
            onClick={this.onSubmit}
          >
            <LoadingText text="Sign Up" show={auth.loading} />
          </button>
        </div>
      </form>
    );
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="register contain">
        <div className="register__header">
          <h1>Sign Up</h1>
          <p className="header-label">Create your Career Portal profile</p>
          <div className="register__form">
            {auth &&
            ((auth.user && auth.user.username) || auth.username) &&
            !auth.isAuthenticated &&
            !auth.userConfirmed
              ? this.renderConfirmationForm()
              : this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  registerUser,
  confirmUser,
  setLoading
})(withRouter(Register));
