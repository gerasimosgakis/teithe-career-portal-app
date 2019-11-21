import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, post } = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} post={post} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired
};

export default CommentFeed;
