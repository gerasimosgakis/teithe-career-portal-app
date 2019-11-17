import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../redux/actions/postActions";

class CommentItem extends Component {
  onDeleteClick(post, commentId) {
    console.log(post, commentId);
    const commentToDelete = post.comments.find(comment => {
      return comment._id === commentId;
    });
    console.log(this.props);
    const index = post.comments.indexOf(commentToDelete);
    this.props.deleteComment(post.postId, index);
  }

  // onDeleteClick(id) {
  //   const eduToDelete = this.props.education.find(edu => {
  //     return edu._id === id;
  //   });
  //   console.log(eduToDelete);
  //   const index = this.props.education.indexOf(eduToDelete);
  //   console.log(index);
  //   this.props.deleteEducation(this.props.user, index);
  // }

  render() {
    const { comment, post, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.userId === auth.user.username ? (
              <button
                onClick={this.onDeleteClick.bind(
                  this,
                  post.post[0],
                  comment._id
                )}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
