import React, { useState } from "react";
import "../../App.css";
import "../../style/registration.css";
import Button from "../../common/Button";
import LabeledInput from "../../common/LabeledInput";
import ErrorBox from "../../common/ErrorBox";

const RegisterAccount = (props: {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  username: string;
  password: string;
  handleFirstName: React.Dispatch<React.SetStateAction<any>>;
  handleLastName: React.Dispatch<React.SetStateAction<any>>;
  handleEmail: React.Dispatch<React.SetStateAction<any>>;
  handleStudentId: React.Dispatch<React.SetStateAction<any>>;
  handleUsername: React.Dispatch<React.SetStateAction<any>>;
  handlePassword: React.Dispatch<React.SetStateAction<any>>;
  handleRegisterCoursesClick: React.Dispatch<React.SetStateAction<any>>;
  displayAccountError: boolean;
  displayUniqueEmailError: boolean;
  displayUniqueUsernameError: boolean;
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
          value={props.password}
          handleChange={props.handlePassword}
        ></LabeledInput>
      );
    }
  };

  return (
    <>
      <h1 className="">Register your Account </h1>
      <div className="form-group mb-3">
        <h2> Profile Information</h2>
        <div className="form-horizontal-container">
          <div className="form-horizontal-subcontainer">
            <LabeledInput
              label="First Name"
              required={true}
              type="text"
              name="firstName"
              id="firstName"
              value={props.firstName}
              handleChange={props.handleFirstName}
            ></LabeledInput>
          </div>
          <div className="form-horizontal-subcontainer">
            <LabeledInput
              label="Last Name"
              required={true}
              type="text"
              name="lastName"
              id="lastName"
              value={props.lastName}
              handleChange={props.handleLastName}
            ></LabeledInput>
          </div>
        </div>
        <LabeledInput
          label="Email"
          required={true}
          type="text"
          name="email"
          id="email"
          value={props.email}
          handleChange={props.handleEmail}
        ></LabeledInput>

        <LabeledInput
          label="Student ID"
          required={false}
          type="text"
          name="studentId"
          id="studentId"
          value={props.studentId}
          handleChange={props.handleStudentId}
        ></LabeledInput>

        <h2 className="mt-5"> Account Information</h2>
        <LabeledInput
          label="Username"
          required={true}
          type="text"
          name="username"
          id="username"
          value={props.username}
          handleChange={props.handleUsername}
        ></LabeledInput>

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
      </div>
      <div className="bottom-form-container">
        {props.displayAccountError && (
          <div className="mb-2">
            <ErrorBox errorMessage="* Please fill in all the required fields."></ErrorBox>
          </div>
        )}
        {props.displayUniqueEmailError && (
          <div className="mb-2">
            <ErrorBox errorMessage="* An account with this email already exists. Please choose a different email."></ErrorBox>
          </div>
        )}
        {props.displayUniqueUsernameError && (
          <div className="mb-2">
            <ErrorBox errorMessage="* An account with this username already exists. Please choose a different username."></ErrorBox>
          </div>
        )}
        <div className="register-account-buttons">
          <Button
            width="16rem"
            type="primary"
            value="Next: Register your Courses >"
            onClick={props.handleRegisterCoursesClick}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default RegisterAccount;
