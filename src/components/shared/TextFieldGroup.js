import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  info,
  type,
  error,
  onChange,
  onKeyPress,
  required,
  disabled,
  small
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={
          !small
            ? classnames("form-control form-control-lg")
            : classnames("form-control form-control-sm")
        }
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        disabled={disabled}
        required={required}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="error-text mt1">{error}</div>}
    </div>
  );
};

TextFieldGroup.prototypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
