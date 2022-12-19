import React from "react";
import Button from "../../common/Button";
import Select from "../../common/Select";

const RegisterCourses = (props: {
  handleTerm: React.Dispatch<React.SetStateAction<any>>;
  handleYear: React.Dispatch<React.SetStateAction<any>>;
  handleRegisteredCourses: React.Dispatch<React.SetStateAction<any>>;
  handleRegisterRolesClick: React.Dispatch<React.SetStateAction<any>>;
  handleRegisterAccountClick: React.Dispatch<React.SetStateAction<any>>;
  term: string;
  year: string;
  registeredCourses: string[];
}) => {
  // TODO: get all terms, years, and courses
  const allTerms = ["Fall", "Winter"];
  const allYears = ["2022", "2023"];
  const allCourses = [
    "COMP307",
    "COMP462",
    "COMP598",
    "COMP360",
    "COMP303",
    "COMP302",
    "COMP432",
  ];

  return (
    <>
      <h1 className="">Register your Courses </h1>
      <div className="form-group mb-3">
        <h2> Educational Information</h2>
        <h4>Registered Semester</h4>
        <div className="form-horizontal-container">
          <div className="form-horizontal-subcontainer">
            <Select
              label="Winter / Fall"
              required={false}
              name="term"
              id="term"
              options={allTerms}
              value={props.term}
              handleChange={props.handleTerm}
            ></Select>
          </div>
          <div className="form-horizontal-subcontainer">
            <Select
              label="Year"
              required={false}
              name="year"
              id="year"
              options={allYears}
              value={props.year}
              handleChange={props.handleYear}
            ></Select>
          </div>
        </div>
        <Select
          label="Registered Courses"
          required={false}
          name="registeredCourses"
          id="registeredCourses"
          options={allCourses}
          value={props.registeredCourses}
          handleChange={props.handleRegisteredCourses}
          isMultiple={true}
        ></Select>

        <div className="register-courses-buttons">
          <div className="mb-2">
            <Button
              width="18rem"
              type="secondary"
              value="< Previous: Register your Account"
              onClick={props.handleRegisterAccountClick}
            ></Button>
          </div>
          <div>
            <Button
              width="15rem"
              type="primary"
              value="Next: Register your Roles >"
              onClick={props.handleRegisterRolesClick}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterCourses;
