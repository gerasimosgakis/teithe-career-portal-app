import React from "react";

export const Logo = ({ name }) => {
  const splitName = name.split(" ");
  const firstInitial = splitName[0][0].toUpperCase();
  const lastInitial =
    splitName.length > 1 ? splitName[1][0].toUpperCase() : null;
  return (
    <div className="logo">
      {firstInitial}
      {lastInitial}
    </div>
  );
};
