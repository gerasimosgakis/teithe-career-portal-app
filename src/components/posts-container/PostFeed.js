import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts } = this.props.posts;

    return posts.map((post, index) => (
      <PostItem key={index} post={post} index={index} />
    ));
  }
}

PostFeed.propTypes = {
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, null)(PostFeed);
