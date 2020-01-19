import React from "react";
import Avatar from "react-avatar";
import titleCase from "../../shared/functions/titleCase";

const UserList = props => {
  console.log(props.userName, props.users);
  const allUsers = props.users.map(
    (user, index) =>
      user.id !== props.userName && (
        <a
          className="userList__container__list__item__link"
          onClick={() => props.onClick(user.id)}
        >
          <li
            key={index}
            className={
              props.otherUserId === user.id
                ? "userList__container__list__item user-bg"
                : "userList__container__list__item"
            }
          >
            <div>
              <Avatar
                email={user.email}
                name={user.name}
                round={true}
                size="30"
              />
            </div>
            <div className="userList__container__list__item__content">
              <p className="userList__container__list__item__content__name">
                {titleCase(user.name)}
              </p>
            </div>
          </li>
        </a>
      )
  );
  return (
    <div className="userList__container">
      <ul className="userList__container__list">{allUsers}</ul>
    </div>
  );
};

export default UserList;
