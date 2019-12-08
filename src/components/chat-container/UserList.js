import React from "react";
import "./UserList.scss";
import { withChatkitOneToOne } from "@pusher/chatkit-client-react";
import Moment from "react-moment";

const UserList = props => {
  console.log(props);
  const allUsers = props.users.map(
    (user, index) =>
      user.handle !== props.userName && (
        <a
          className="UserList__container__list__item__link"
          onClick={() => props.onClick(user.id)}
        >
          <li className="UserList__container__list__item" key={index}>
            <div>
              <img
                src={
                  user.avatar ||
                  "//www.gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?s=300&r=pg&d=mm"
                }
                className="UserList__container__list__item__avatar"
                alt="avatar"
              />
            </div>
            <div className="UserList__container__list__item__content">
              <p className="UserList__container__list__item__content__name">
                {user.handle}
              </p>
              {/* <p className="UserList__container__list__item__content__text">
                {props &&
                props.chatkit.messages.length > 0 &&
                props.chatkit.messages[props.chatkit.messages.length - 1] &&
                props.chatkit.messages[props.chatkit.messages.length - 1].parts
                  .length > 0
                  ? props.chatkit.messages[props.chatkit.messages.length - 1]
                      .parts[0].payload.content
                  : ""}
              </p> */}
            </div>
            {/* <div className="UserList__container__list__item__time">
              {props &&
              props.chatkit.messages.length > 0 &&
              props.chatkit.messages[props.chatkit.messages.length - 1] ? (
                <Moment
                  calendar={{
                    sameDay: "LT",
                    lastDay: "[Yesterday at] LT",
                    lastWeek: "[last] dddd [at] LT"
                  }}
                >
                  {
                    props.chatkit.messages[props.chatkit.messages.length - 1]
                      .createdAt
                  }
                </Moment>
              ) : (
                ""
              )}
            </div> */}
          </li>
        </a>
      )
  );
  return (
    <div className="UserList__container">
      <ul className="UserList__container__list">{allUsers}</ul>
      {/* <div className="UserList__titlebar">
        <img
          src={defaultAvatar}
          className="UserList__titlebar__avatar"
          alt="avatar"
        />
        <span className="UserList__titlebar__logged-in-as">
          {props.userName}
        </span>
      </div>
      <div className="UserList__container">
        <ul className="UserList__container__list">
          <li className="UserList__container__list__item">
            <button
              onClick={() =>
                props.onClick("85ab6b9e-c439-4b4a-b7f8-adee53ef2e70")
              }
            >
              <div>
                <img
                  src={defaultAvatar}
                  className="UserList__container__list__item__avatar"
                  alt="avatar"
                />
              </div>
              <div className="UserList__container__list__item__content">
                <p className="UserList__container__list__item__content__name">
                  Alice Andrews
                </p>
                <p className="UserList__container__list__item__content__text">
                  You: That would be great!
                </p>
              </div>
              <div className="UserList__container__list__item__time">
                10:01 AM
              </div>
            </button>
          </li>
          <li className="UserList__container__list__item UserList__container__list__item--selected">
            <button
              onClick={() =>
                props.onClick("79cba60d-8463-4015-92da-091384babbff")
              }
            >
              <div>
                <img
                  src={defaultAvatar}
                  className="UserList__container__list__item__avatar"
                  alt="avatar"
                />
              </div>
              <div className="UserList__container__list__item__content">
                <p className="UserList__container__list__item__content__name">
                  Joe Bloggs
                </p>
                <p className="UserList__container__list__item__content__text">
                  Joe: Not bad, how was yours?
                </p>
              </div>
              <div className="UserList__container__list__item__time">
                9:38 AM
              </div>
            </button>
          </li>
          <li className="UserList__container__list__item">
            <div>
              <img
                src={defaultAvatar}
                className="UserList__container__list__item__avatar"
                alt="avatar"
              />
            </div>
            <div className="UserList__container__list__item__content">
              <p className="UserList__container__list__item__content__name">
                Jane Smith
              </p>
              <p className="UserList__container__list__item__content__text">
                Jane: Did you get the files I sent yesterday?
              </p>
            </div>
            <div className="UserList__container__list__item__time">
              Yesterday
            </div>
          </li> 
        </ul>
        */}
    </div>
  );
};

export default UserList;
