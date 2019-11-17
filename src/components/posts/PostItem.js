import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import {
//   deletePost,
//   addLike,
//   removeLike
// } from "../../redux/actions/postActions";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    const currentUserId = this.props.auth.user.username;
    this.props.addLike(id, currentUserId);
  }

  onUnlikeClick(id) {
    const currentUserId = this.props.auth.user.username;
    this.props.removeLike(id, currentUserId);
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.user_name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post.id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-info fas fa-thumbs-up" />
                  {post.likes ? (
                    <span className="badge badge-light">
                      {post.likes.values.length}
                    </span>
                  ) : null}
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post.id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post.id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.userId === auth.user.username ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post.id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  // deletePost: PropTypes.func.isRequired,
  // addLike: PropTypes.func.isRequired,
  // removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

// export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
//   PostItem
// );

export default connect(mapStateToProps, {})(PostItem);
