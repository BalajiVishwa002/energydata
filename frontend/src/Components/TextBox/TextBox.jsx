import React from "react";
import { FaBeer } from "react-icons/fa";
import "./TextBox.css";

const TextBox = ({
  icon: Icon,
  name,
  type,
  onChange,
  value,
  label,
  required = false,
  placeholder,
  error,
  ref
}) => {
  return (
    <>
    <div className={`form-input ${error ? "error-text" : ""}`}>
      {Icon && <Icon className="icon" />}
      <div className="input-field">
        <input
        ref={ref}
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          required={required}
          placeholder={placeholder}
          />
      </div>
      <div className="input-lable">{label}</div>
    {error ?<small className="error-message">{error}</small> :""}
    </div>
    </>
  );
};

export default TextBox;
