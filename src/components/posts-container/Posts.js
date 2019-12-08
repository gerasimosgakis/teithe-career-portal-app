import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../shared/Spinner";
import { getPosts } from "../../redux/actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.posts;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed contain">
        {/* <div className="container"> */}
        {/* <div className="row">
          <div className="col-md-12"> */}
        <PostForm />
        {postContent}
        {/* </div>
        </div> */}
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getPosts })(Posts);
