import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../shared/Spinner";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: true
    };
  }

  componentWillUpdate() {
    console.log();
  }

  render() {
    console.log(this.props.comments);
    // const { comments } = this.props;
    return (
      <div>
        {this.props.comments.map(comment => (
          <CommentItem comment={comment} />
        ))}
      </div>
    );
  }
}

export default CommentFeed;
