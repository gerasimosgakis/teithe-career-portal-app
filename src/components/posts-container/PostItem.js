import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Linkify from "react-linkify";
import titleCase from "../../shared/functions/titleCase";
import {
  addLike,
  deletePost,
  getCommentsByPost
} from "../../redux/actions/postActions";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Avatar from "react-avatar";

class PostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: this.props.post,
      showComments: false
    };
  }

  /**
   * Deletes post
   * @param {*} id - Post to be deleted id
   */
  onDeleteClick(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui card card-body text-center">
            <h2>Are you sure?</h2>
            <p>You want to delete this post?</p>
            <div className="text-center">
              <button
                className="button button--small transparent-btn mr1"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="button button--small danger-btn"
                onClick={() => {
                  this.props.deletePost(id);
                  onClose();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      }
    });
  }

  onLikeClick = (id, liked) => {
    const currentUserId = this.props.auth.user.username;
    const currentUserName = this.props.auth.user.attributes.name;
    this.props.addLike(id, currentUserId, currentUserName, liked);
  };

  showComments = () => {
    if (!this.state.showComments) {
      this.props.getCommentsByPost(this.state.post.id, this.props.index);
    }
    this.setState({ showComments: !this.state.showComments });
  };

  render() {
    const { post, auth } = this.props;
    const currentUserId = auth.user.username;
    const currentUserName = auth.user.attributes.name;
    const currentUserEmail = auth.user.attributes.email;
    return (
      <div className="card posts__post-item mb2">
        <div className="card-body card posts__post-item-body">
          <div className="posts__post-item-body-details">
            <span className="mb-2">
              <Avatar
                email={this.state.post.user_email}
                name={this.state.post.user_name.toLowerCase()}
                round={true}
                size="50"
              />
            </span>
            <p className="text-center">{titleCase(post.user_name)}</p>
          </div>
          <div className="posts__post-item-body-main">
            <Linkify>{post.text}</Linkify>
            <p className="mt1 help-text">
              {new Date(parseInt(post.created_at)).toLocaleDateString()},{" "}
              {new Date(parseInt(post.created_at))
                .toLocaleTimeString()
                .slice(0, 5)}
            </p>
          </div>
        </div>
        <div className="card-footer posts__post-item-footer">
          <div className="posts__post-item-footer-buttons">
            <div className="posts__post-item-footer-buttons-button">
              <span className="mr1">
                <button
                  className="thumbs-button"
                  onClick={() => {
                    this.onLikeClick(post.id, true);
                  }}
                >
                  <i className="fas fa-thumbs-up mr-half"></i>
                </button>
                {post.likes}
              </span>
            </div>
            <div className="posts__post-item-footer-buttons-button">
              <button
                className="button button--small transparent-btn mr1"
                onClick={() => this.showComments()}
              >
                Comment
              </button>
              {auth.user.username === post.user_id && (
                <button
                  className="button button--small danger-btn"
                  onClick={() => this.onDeleteClick(post.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          {this.state.showComments && (
            <div>
              <CommentForm
                postId={post.id}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                currentUserEmail={currentUserEmail}
              />
              {this.state.post.comments && this.state.post.comments.length > 0 && (
                <div className="mt2">
                  <CommentFeed comments={this.state.post.comments} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profiles,
  posts: state.posts
});

export default connect(mapStateToProps, {
  addLike,
  deletePost,
  getCommentsByPost
})(PostItem);
