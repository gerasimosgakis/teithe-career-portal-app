import React from "react";

export default function SuccessIcon(props) {
  return (
    <div>
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <p className="text-center">{props.text}</p>
    </div>
  );
}
