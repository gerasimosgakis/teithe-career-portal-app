import React, { Component } from "react";
import titleCase from "../../shared/functions/titleCase";
import Linkify from "react-linkify";
import Avatar from "react-avatar";
export default class CommentItem extends Component {
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
              name={this.props.comment.user_name}
              round={true}
              size="30"
            />
          </span>
          {/* <p>{titleCase(this.props.comment.user_name)}</p> */}
          <p>
            <span className="mr1 bolded">
              {titleCase(this.props.comment.user_name)}
            </span>
            <Linkify>{this.props.comment.text}</Linkify>
            <p className="mt1 help-text">
              {new Date(
                parseInt(this.props.comment.created_at)
              ).toLocaleDateString()}
            </p>
          </p>
        </div>
      </div>
    );
  }
}
