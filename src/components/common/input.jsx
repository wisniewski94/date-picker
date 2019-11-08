import React from "react";
import PropTypes from "prop-types";
import "../../styles/input.sass";

const Input = ({ name, label, className, ...rest }) => {
  return (
    <input className={"dp-input"} {...rest} name={name} placeholder={label} />
  );
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
};

export default Input;
