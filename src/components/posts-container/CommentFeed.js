import React, { Component } from "react";
import { connect } from "react-redux";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: true
    };
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment, index) => (
          <CommentItem key={index} comment={comment} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, null)(CommentFeed);
