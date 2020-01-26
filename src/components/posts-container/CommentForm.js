import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../shared/TextFieldGroup";
import { addComment } from "../../redux/actions/postActions";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post_id: this.props.postId,
      user_id: this.props.currentUserId,
      user_name: this.props.currentUserName,
      user_email: this.props.currentUserEmail,
      text: "",
      showEmoji: false
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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * Adds comment
   */
  onCommentSubmit = event => {
    event.preventDefault();
    const { post_id, user_id, user_name, user_email, text } = this.state;
    const comment = { post_id, user_id, user_name, user_email, text };
    this.props.addComment(comment);
    this.setState({ text: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onCommentSubmit}>
          <div className="form-group mt2">
            <TextFieldGroup
              placeholder="Reply to post"
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
                  ? "button posts__post-form-emoji-button--small lead-text"
                  : "button posts__post-form-emoji-button--small help-text"
              }
              onClick={this.toggleEmojiPicker}
            >
              <i className="far fa-grin"></i>
            </button>
            <button type="submit" className="button button--small submit-btn">
              Submit
            </button>
          </div>
        </form>
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
