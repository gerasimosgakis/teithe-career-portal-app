import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts } = this.props.posts;
    console.log(posts);

    return posts.map((post, index) => (
      <PostItem key={post.postId} post={post} index={index} />
    ));
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, null)(PostFeed);
