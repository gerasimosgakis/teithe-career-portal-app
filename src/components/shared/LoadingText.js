import React from "react";
import spinner from "./spinner.gif";

export default function LoadingText(props) {
  console.log(props);
  return (
    <span className="loading-text">
      {props.show ? (
        <span>
          <span>Loading </span>
          <span className="loading-text__dot">.</span>
          <span className="loading-text__dot">.</span>
          <span className="loading-text__dot">.</span>
        </span>
      ) : (
        <span>{props.text}</span>
      )}
    </span>
  );
}
