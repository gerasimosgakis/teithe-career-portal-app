import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";
import { addPost } from "../../redux/actions/postActions";
import gravatar from "gravatar";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
  }

  // UNSAFE_componentWillReceiveProps(newProps) {
  //   if (newProps.errors) {
  //     this.setState({ errors: newProps.errors });
  //   }
  // }

  onSubmit = e => {
    e.preventDefault();

    const currentUserId = this.props.auth.user.username;
    const email = this.props.auth.user.attributes.email;
    // const avatar = gravatar.url(email, {
    //   s: "150", // size
    //   r: "pg", // rating
    //   d: "mm" //default});
    // });
    const postData = {
      user_id: currentUserId,
      text: this.state.text,
      user_name: this.props.auth.user.attributes.name,
      user_email: email
    };

    this.props.addPost(postData);
    this.setState({ text: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="posts__post-form mb2">
        <div className="card card-info">
          <div className="card-header posts__post-form-header text-white">
            Say Something...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
              <div className="btn-group right">
                <button type="submit" className="button submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
