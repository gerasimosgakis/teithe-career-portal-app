import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Linkify from "react-linkify";
import titleCase from "../../shared/functions/titleCase";
import { addLike, deletePost } from "../../redux/actions/postActions";
import TextFieldGroup from "../shared/TextFieldGroup";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

class PostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: this.props.post,
      showComments: false
    };
  }

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

  onUnlikeClick(id) {
    const currentUserId = this.props.auth.user.username;
    const currentUserName = this.props.auth.user.attributes.name;
    this.props.removeLike(id, currentUserId, currentUserName);
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className="card posts__post-item mb2">
        <div className="card-body card posts__post-item-body">
          <div className="posts__post-item-body-details">
            <span className="mb-2">
              <img
                className="rounded-circle"
                width="50px"
                src={this.state.post.avatar}
                alt=""
              />
            </span>
            <p className="text-center">{titleCase(post.user_name)}</p>
          </div>
          <div className="posts__post-item-body-main">
            <Linkify>{post.text}</Linkify>
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

              {/* <span>
              <button
                className="thumbs-button"
                // onClick={() => {
                //   this.onLikeClick(post.id, false);
                // }}
              >
                <i className="fas fa-thumbs-down mr-half"></i>{" "}
              </button>
              0
            </span> */}
            </div>
            <div className="posts__post-item-footer-buttons-button">
              <button
                className="button button--small transparent-btn mr1"
                onClick={() =>
                  this.setState({ showComments: !this.state.showComments })
                }
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
            <form onSubmit={this.onSubmit}>
              <div className="form-group mt2">
                <TextFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                />
              </div>
              <div className="btn-group right">
                <button
                  type="submit"
                  className="button button--small submit-btn"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      // <div className="card card-body mb2">
      //   <div className="row">
      //     <div className="col-md-2">
      //       <a href="profile.html">
      //         <img
      //           className="rounded-circle d-none d-md-block"
      //           src={post.avatar}
      //           alt=""
      //         />
      //       </a>
      //       <br />
      //       <p className="text-center">{post.user_name}</p>
      //     </div>
      //     <div className="col-md-10">
      //       <p className="lead">{post.text}</p>
      //       {showActions ? (
      //         <span>
      //           <button
      //             onClick={this.onLikeClick.bind(this, post.id)}
      //             type="button"
      //             className="btn btn-light mr-1"
      //           >
      //             <i className="text-info fas fa-thumbs-up" />
      //             {post.likes ? (
      //               <span className="badge badge-light">
      //                 {post.likes.values.length}
      //               </span>
      //             ) : null}
      //           </button>
      //           <button
      //             onClick={this.onUnlikeClick.bind(this, post.id)}
      //             type="button"
      //             className="btn btn-light mr-1"
      //           >
      //             <i className="text-secondary fas fa-thumbs-down" />
      //           </button>
      //           <Link to={`/post/${post.id}`} className="btn btn-info mr-1">
      //             Comments
      //           </Link>
      //           {post.userId === auth.user.username ? (
      //             <button
      //               onClick={this.onDeleteClick.bind(this, post.id)}
      //               type="button"
      //               className="btn btn-danger mr-1"
      //             >
      //               <i className="fas fa-times" />
      //             </button>
      //           ) : null}
      //         </span>
      //       ) : null}
      //     </div>
      //   </div>
      // </div>
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
  auth: state.auth,
  posts: state.posts
});

// export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
//   PostItem
// );

export default connect(mapStateToProps, { addLike, deletePost })(PostItem);
