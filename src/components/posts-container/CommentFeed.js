import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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

CommentFeed.propTypes = {
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, null)(CommentFeed);
