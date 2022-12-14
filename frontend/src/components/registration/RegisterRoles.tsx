import React from "react";
import Button from "../../common/Button";
import CheckboxList from "../../common/CheckboxList";
import ErrorBox from "../../common/ErrorBox";

const RegisterRoles = (props: {
  handleRegisterCoursesClick: React.Dispatch<React.SetStateAction<any>>;
  handleRoles: React.Dispatch<React.SetStateAction<any>>;
  firstName: string;
  lastName: string;
  roles: any[];
  availableRoles: any[];
  displayRoleError: boolean;
}) => {
  return (
    <>
      <h1 className="">Register your Roles </h1>
      <div className="form-group mb-3">
        <h2>
          Registering {props.firstName} {props.lastName} as:
        </h2>
        <h4 className="mb-4">* Select all that apply</h4>
        <CheckboxList
          options={props.availableRoles}
          selectedOptions={props.roles}
          handleCheckbox={props.handleRoles}
        ></CheckboxList>
        {props.displayRoleError && (
          <ErrorBox errorMessage="* You must select one of the roles."></ErrorBox>
        )}
        <div className="register-courses-buttons mt-5">
          <div className="mb-2">
            <Button
              width="18rem"
              type="secondary"
              value="< Previous: Register your Courses"
              onClick={props.handleRegisterCoursesClick}
            ></Button>
          </div>
            <Button width="14rem" type="submit" value="Submit"></Button>
        </div>
      </div>
    </>
  );
};

export default RegisterRoles;
