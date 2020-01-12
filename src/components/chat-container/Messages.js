import Moment from "react-moment";
import React, { useState, useEffect } from "react";
import { withChatkitOneToOne } from "@pusher/chatkit-client-react";

import Avatar from "react-avatar";
import titleCase from "../../shared/functions/titleCase";

function Messages(props) {
  const [pendingMessage, setPendingMessage] = useState("");
  const messageList = React.createRef();

  /**
   * Calls handleSendMessage on Enter
   * @param {*} event
   */
  const handleMessageKeyDown = event => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleMessageChange = event => {
    setPendingMessage(event.target.value);
  };

  /**
   * Sends Message to chatKit
   */
  const handleSendMessage = () => {
    if (pendingMessage === "") {
      return;
    }
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
    textContent: m.parts[0].payload.content
  }));

  return (
    <div className="Messages">
      <div className="Messages__titlebar">
        <Avatar
          email={props && props.user ? props.user.email : null}
          name={props && props.user ? props.user.name : null}
          round={true}
          size="30"
        />
        <div className="Messages__titlebar__details ml1">
          <span>
            {props.chatkit.isLoading
              ? "Loading..."
              : titleCase(props.chatkit.otherUser.name)}
          </span>
        </div>
      </div>
      <div className="Messages__messages" ref={messageList}>
        {messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </div>
      <div className="Messages__compose">
        <input
          className="Messages__compose__input mr1"
          type="text"
          placeholder="Type a message..."
          value={pendingMessage}
          onChange={handleMessageChange}
          onKeyDown={handleMessageKeyDown}
        />
        <button className="button transparent-btn" onClick={handleSendMessage}>
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
