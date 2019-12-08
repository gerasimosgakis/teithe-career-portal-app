import Moment from "react-moment";
import React, { useState, useEffect } from "react";
import { withChatkitOneToOne } from "@pusher/chatkit-client-react";

import "./Messages.scss";
import defaultAvatar from "./default-avatar.png";
import Avatar from "react-avatar";

function Messages(props) {
  console.log(props);
  const [pendingMessage, setPendingMessage] = useState("");
  const messageList = React.createRef();

  const handleMessageKeyDown = event => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleMessageChange = event => {
    setPendingMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (pendingMessage === "") {
      return;
    }
    // TODO: Send message to Chatkit
    props.chatkit.sendSimpleMessage({ text: pendingMessage });
    setPendingMessage("");
  };

  useEffect(() => {
    messageList.current.scrollTop = messageList.current.scrollHeight;
  });

  const messages = props.chatkit.messages.map(m => ({
    id: m.id,
    isOwnMessage: m.sender.id === props.chatkit.currentUser.id,
    createdAt: m.createdAt,
    // This will only work with simple messages.
    // To learn more about displaying multi-part messages see
    // https://pusher.com/docs/chatkit/reference/javascript#messages
    textContent: m.parts[0].payload.content
  }));

  return (
    <div className="Messages">
      <div className="Messages__titlebar">
        {/* <img
          src={props && props.user ? props.user.avatar : defaultAvatar}
          className="Messages__titlebar__avatar"
          alt="avatar"
        /> */}
        <Avatar
          email={props && props.user ? props.user.email : null}
          name={props && props.user ? props.user.name : null}
          round={true}
          size="30"
        />
        <div className="Messages__titlebar__details ml1">
          {/*TODO: Get other user's name from Chatkit */}
          <span>
            {props.chatkit.isLoading
              ? "Loading..."
              : props.chatkit.otherUser.name}
          </span>
        </div>
      </div>
      <div className="Messages__messages" ref={messageList}>
        {messages.map(m => (
          <Message key={m.id} {...m} />
        ))}
      </div>
      <div className="Messages__compose">
        <input
          className="Messages__compose__input"
          type="text"
          placeholder="Type a message..."
          value={pendingMessage}
          onChange={handleMessageChange}
          onKeyDown={handleMessageKeyDown}
        />
        <button
          className="Messages__compose__button"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

function Message({ isOwnMessage, isLatestMessage, createdAt, textContent }) {
  return (
    <div
      className={
        isOwnMessage
          ? "Messages__messages__message__wrapper Messages__messages__message__wrapper--self"
          : "Messages__messages__message__wrapper Messages__messages__message__wrapper--other"
      }
    >
      <div className="Messages__messages__message__wrapper__inner">
        <div
          className={
            isOwnMessage
              ? "Messages__messages__message Messages__messages__message--self"
              : "Messages__messages__message Messages__messages__message--other"
          }
        >
          <div className="Messages__messages__message__content">
            {textContent}
          </div>
          <div className="Messages__messages__message__time">
            <Moment
              calendar={{
                sameDay: "LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[last] dddd [at] LT"
              }}
            >
              {createdAt}
            </Moment>
          </div>
          <div
            className={
              isOwnMessage
                ? "Messages__messages__message__arrow alt"
                : "Messages__messages__message__arrow"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default withChatkitOneToOne(Messages);
