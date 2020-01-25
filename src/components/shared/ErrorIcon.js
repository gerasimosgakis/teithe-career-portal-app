import React from "react";

export default function ErrorIcon(props) {
  return (
    <div>
      <div className="error-icon">
        <div className="error-icon-error">
          <div className="error-icon-error-x">
            <div className="error-icon-error-left"></div>
            <div className="error-icon-error-right"></div>
          </div>
          <div className="error-icon-error-placeholder"></div>
          <div className="error-icon-error-fix"></div>
        </div>
      </div>
      <p className="text-center">{props.text}</p>
    </div>
  );
}
