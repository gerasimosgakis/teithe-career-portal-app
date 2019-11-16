import React from "react";
import "./UserList.scss";
import defaultAvatar from "./default-avatar.png";

const UserList = ({ userName, onClick }) => {
  return (
    <div className="">
      <div className="UserList__titlebar">
        <img
          src={defaultAvatar}
          className="UserList__titlebar__avatar"
          alt="avatar"
        />
        <span className="UserList__titlebar__logged-in-as">{userName}</span>
      </div>
      <div className="UserList__container">
        <ul className="UserList__container__list">
          <li className="UserList__container__list__item">
            <button
              onClick={() => onClick("85ab6b9e-c439-4b4a-b7f8-adee53ef2e70")}
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
              onClick={() => onClick("79cba60d-8463-4015-92da-091384babbff")}
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
      </div>
    </div>
  );
};

export default UserList;
