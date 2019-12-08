import React from "react";
import Avatar from "react-avatar";

const UserList = props => {
  const allUsers = props.users.map(
    (user, index) =>
      user.handle !== props.userName && (
        <a
          className="UserList__container__list__item__link"
          onClick={() => props.onClick(user.id)}
        >
          <li className="UserList__container__list__item" key={index}>
            <div>
              <Avatar
                email={user.email}
                name={user.name}
                round={true}
                size="30"
              />
            </div>
            <div className="UserList__container__list__item__content">
              <p className="UserList__container__list__item__content__name">
                {user.handle}
              </p>
            </div>
          </li>
        </a>
      )
  );
  return (
    <div className="UserList__container">
      <ul className="UserList__container__list">{allUsers}</ul>
    </div>
  );
};

export default UserList;
