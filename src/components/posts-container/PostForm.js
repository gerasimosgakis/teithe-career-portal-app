import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";
import { addPost } from "../../redux/actions/postActions";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      showEmoji: false,
      errors: {}
    };
  }

  /**
   * Shows or hides Emoji picker
   */
  toggleEmojiPicker = () => {
    this.setState({ showEmoji: !this.state.showEmoji });
  };

  /**
   * Adds the emoji into the text
   */
  addEmoji = e => {
    let emoji = e.native;
    this.setState({
      text: this.state.text + emoji
    });
  };

  /**
   * Adds post
   */
  onSubmit = e => {
    e.preventDefault();

    const currentUserId = this.props.auth.user.username;
    const email = this.props.auth.user.attributes.email;
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
              <div className="d-flex justify-space-between">
                <button
                  type="button"
                  className={
                    this.state.showEmoji
                      ? "button posts__post-form-emoji-button lead-text"
                      : "button posts__post-form-emoji-button help-text"
                  }
                  onClick={this.toggleEmojiPicker}
                >
                  <i className="far fa-grin"></i>
                </button>
                <button type="submit" className="button submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <span
          className={
            this.state.showEmoji
              ? "posts__post-form-emoji-picker posts__post-form-emoji-picker--show"
              : "posts__post-form-emoji-picker posts__post-form-emoji-picker--hide"
          }
        >
          <Picker onSelect={this.addEmoji} />
        </span>
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
