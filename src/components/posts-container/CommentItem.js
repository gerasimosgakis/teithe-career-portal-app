import React, { Component } from "react";
import { connect } from "react-redux";
import titleCase from "../../shared/functions/titleCase";
import Linkify from "react-linkify";
import Avatar from "react-avatar";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { deleteComment } from "../../redux/actions/postActions";
class CommentItem extends Component {
  onDeleteClick(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui card card-body text-center">
            <h2>Are you sure?</h2>
            <p>You want to delete this comment?</p>
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
                  this.props.deleteComment(id);
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

  render() {
    return (
      <div className="comments">
        <div className="comments__comment">
          <span className="mb2 mr2">
            {/* <img
              className="rounded-circle"
              width="30px"
              src={this.props.comment.avatar}
              alt=""
            /> */}
            <Avatar
              email={this.props.comment.user_email}
              name={this.props.comment.user_name.toLowerCase()}
              round={true}
              size="30"
            />
          </span>
          <div>
            <span className="mr1 bolded">
              {titleCase(this.props.comment.user_name)}
            </span>
            <Linkify>{this.props.comment.text}</Linkify>
            <p className="mt1 help-text">
              {new Date(
                parseInt(this.props.comment.created_at)
              ).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button
          className="comments__delete-button icon-button icon-button--small icon-button--danger"
          onClick={() => this.onDeleteClick(this.props.comment.id)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    );
  }
}

export default connect(null, { deleteComment })(CommentItem);
