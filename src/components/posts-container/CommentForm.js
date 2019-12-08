import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../shared/TextFieldGroup";
import { addComment } from "../../redux/actions/postActions";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post_id: this.props.postId,
      user_id: this.props.currentUserId,
      user_name: this.props.currentUserName,
      avatar: this.props.avatar,
      text: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCommentSubmit = event => {
    event.preventDefault();
    this.props.addComment(this.state);
    this.setState({ text: "" });
  };

  render() {
    return (
      <form onSubmit={this.onCommentSubmit}>
        <div className="form-group mt2">
          <TextFieldGroup
            placeholder="Reply to post"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
          />
        </div>
        <div className="btn-group right">
          <button type="submit" className="button button--small submit-btn">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default connect(null, { addComment })(CommentForm);
