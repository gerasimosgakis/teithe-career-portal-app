import Moment from "react-moment";
import React, { useState, useEffect } from "react";
import { withChatkitOneToOne } from "@pusher/chatkit-client-react";
import Avatar from "react-avatar";
import titleCase from "../../shared/functions/titleCase";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Messages(props) {
  const [pendingMessage, setPendingMessage] = useState("");
  let [showEmoji, setShowEmoji] = useState(false);
  const messageList = React.createRef();
  let emojiButton;
  let emojiPicker;

  /**
   * UseEffect replaces lifecycle hooks
   */
  useEffect(() => {
    // Create event listener for emoji button
    document.addEventListener("mousedown", handleEmojiClickOut, false);
    return () => {
      // Remove event listener
      return document.removeEventListener(
        "mousedown",
        handleEmojiClickOut,
        false
      );
    };
  });

  /**
   * Handle Emoji click outside
   */
  const handleEmojiClickOut = event => {
    if (
      emojiButton.contains(event.target) ||
      emojiPicker.contains(event.target)
    ) {
      return;
    }
    setShowEmoji(false);
  };

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

  /**
   * Shows or hides Emoji picker
   */
  const toggleEmojiPicker = () => {
    setShowEmoji(!showEmoji);
  };

  /**
   * Adds emoji to the message
   * @param {*} e
   */
  const addEmoji = e => {
    let emoji = e.native;
    setPendingMessage(pendingMessage + emoji);
  };

  const messages = props.chatkit.messages.map(m => ({
    id: m.id,
    isOwnMessage: m.sender.id === props.chatkit.currentUser.id,
    createdAt: m.createdAt,
    textContent: m.parts[0].payload.content
  }));

  return (
    <div className="messages">
      <div className="messages__titlebar">
        <Avatar
          email={props && props.user ? props.user.email : null}
          name={props && props.user ? props.user.name : null}
          round={true}
          size="30"
        />
        <div className="messages__titlebar__details ml1">
          <span>
            {props.chatkit.isLoading
              ? "Loading..."
              : titleCase(props.chatkit.otherUser.name)}
          </span>
        </div>
      </div>
      <div className="messages__messages" ref={messageList}>
        {messages.map(message => (
          <Message key={message.id} {...message} />
        ))}
      </div>
      <span
        ref={element => (emojiPicker = element)}
        className={
          showEmoji
            ? "messages-emoji-picker messages-emoji-picker--show"
            : "messages-emoji-picker messages-emoji-picker--hide"
        }
      >
        <Picker onSelect={addEmoji} />
      </span>
      <div className="messages__compose">
        <input
          className="messages__compose__input mr1"
          type="text"
          placeholder="Type a message..."
          value={pendingMessage}
          onChange={handleMessageChange}
          onKeyDown={handleMessageKeyDown}
        />
        <button
          ref={element => (emojiButton = element)}
          type="button"
          className={
            showEmoji
              ? "button messages__compose-emoji-button lead-text"
              : "button messages__compose-emoji-button help-text"
          }
          onClick={toggleEmojiPicker}
        >
          <i className="far fa-grin"></i> {showEmoji}
        </button>
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
          ? "messages__messages__message__wrapper messages__messages__message__wrapper--self"
          : "messages__messages__message__wrapper messages__messages__message__wrapper--other"
      }
    >
      <div className="messages__messages__message__wrapper__inner">
        <div
          className={
            isOwnMessage
              ? "messages__messages__message messages__messages__message--self"
              : "messages__messages__message messages__messages__message--other"
          }
        >
          <div className="messages__messages__message__content">
            {textContent}
          </div>
          <div className="messages__messages__message__time">
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
                ? "messages__messages__message__arrow alt"
                : "messages__messages__message__arrow"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default withChatkitOneToOne(Messages);
