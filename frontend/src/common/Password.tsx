import React, { useState } from "react";
import "../style/common/tile.css";
import LabeledInput from "./LabeledInput";

const Password = (props: {
  password: string;
  placeholder?: string
  handlePassword: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordCheck = (e: any) => {
    e.target.checked ? setShowPassword(true) : setShowPassword(false);
  };
  const renderPassword = () => {
    if (showPassword) {
      return (
        <LabeledInput
          label="Password"
          required={true}
          type="text"
          name="password"
          id="password"
          placeholder={props.placeholder}
          value={props.password}
          handleChange={props.handlePassword}
        ></LabeledInput>
      );
    } else {
      return (
        <LabeledInput
          label="Password"
          required={true}
          type="password"
          name="password"
          id="password"
          placeholder={props.placeholder}
          value={props.password}
          handleChange={props.handlePassword}
        ></LabeledInput>
      );
    }
  };
  return (
    <>
      {renderPassword()}
      <div className="d-flex">
        <div>
          <input
            type="checkbox"
            id="showPassword"
            name="showPassword"
            onClick={handlePasswordCheck}
          ></input>
        </div>
        <div className="show-password"> Show Password</div>
      </div>
    </>
  );
};

Password.defaultProps = {placeholder: ""};
export default Password;
