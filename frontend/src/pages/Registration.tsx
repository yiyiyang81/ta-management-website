import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import combinedLogos from "../assets/images/combined-logos.png";
import socsLogo from "../assets/images/socs-logo.png";
import mcgillLogo from "../assets/images/mcgill-logo.png";
import { UserContext } from "../App";
import "../App.css";
import "../style/registration.css";
import RegisterAccount from "../components/registration/RegisterAccount";
import RegisterCourses from "../components/registration/RegisterCourses";
import RegisterRoles from "../components/registration/RegisterRoles";

const Registration: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState("Account Registration");

  // Account Registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountError, setAccountError] = useState(false);

  // Course Registration
  const [term, setTerm] = useState("Fall");
  const [year, setYear] = useState(new Date().getFullYear());
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const handleRegisteredCourses = (value: string) => {
    if (registeredCourses.filter((val) => val === value).length > 0) {
      setRegisteredCourses(
        registeredCourses.filter((course) => course != value)
      );
    } else {
      setRegisteredCourses(registeredCourses.concat([value]));
    }
  };

  // Role Registration
  // TODO: Implement role validation method
  const availableRoles = [
    "Student",
    "Teaching Assistant",
    "Instructor",
    "TA Administrator",
  ];
  const [roles, setRoles] = useState([]);
  const [roleError, setRoleError] = useState(false);
  const handleRoles = (value: string) => {
    if (roles.filter((val) => val === value).length > 0) {
      setRoles(roles.filter((role) => role != role));
    } else {
      setRoles(roles.concat([value]));
    }
  };

  const isValidAccount =
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    username !== "" &&
    password !== "";
  const isValidRole = roles.length > 0;

  // Navigation handlers
  const handleRegisterCoursesClick = () => {
    if (isValidAccount) {
      setFormState("Course Registration");
    } else {
      setAccountError(true);
    }
  };

  const submitRegistration = (e) => {
    e.preventDefault();
    if (isValidRole) {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        studentId: studentId,
        term: term,
        year: year,
        registeredCourses: registeredCourses,
        roles: roles,
      };
      console.log(newUser);
    } else {
      setRoleError(true);
    }
    // TODO: Create a new user
  };

  return (
    <div className="landing-container">
      <div className="registration-form-container">
        <div className="logo-container mb-5">
          <a className="stacked-logos d-sm-none d-flex flex-column" href="/">
            <img className="logo" src={socsLogo} alt="socs-logo" />
            <img className="logo" src={mcgillLogo} alt="mcgill-logo" />
          </a>
          <a className="d-none d-sm-block" href="/">
            <img className="logo" src={combinedLogos} alt="mcgill-logo" />
          </a>
        </div>
        <form onSubmit={submitRegistration}>
          <div className="form-inner mt-2">
            {formState === "Account Registration" && (
              <RegisterAccount
                firstName={firstName}
                lastName={lastName}
                email={email}
                studentId={studentId}
                username={username}
                password={password}
                handleFirstName={setFirstName}
                handleLastName={setLastName}
                handleEmail={setEmail}
                handleStudentId={setStudentId}
                handleUsername={setUsername}
                handlePassword={setPassword}
                handleRegisterCoursesClick={handleRegisterCoursesClick}
                displayError={accountError}
              ></RegisterAccount>
            )}

            {formState === "Course Registration" && (
              <RegisterCourses
                handleTerm={setTerm}
                handleYear={setYear}
                handleRegisteredCourses={handleRegisteredCourses}
                term={term}
                year={year}
                registeredCourses={registeredCourses}
                handleRegisterRolesClick={() =>
                  setFormState("Role Registration")
                }
                handleRegisterAccountClick={() =>
                  setFormState("Account Registration")
                }
              ></RegisterCourses>
            )}

            {formState === "Role Registration" && (
              <RegisterRoles
                handleRegisterCoursesClick={() =>
                  setFormState("Course Registration")
                }
                handleRoles={handleRoles}
                firstName={firstName}
                lastName={lastName}
                roles={roles}
                availableRoles={availableRoles}
                displayRoleError={roleError}
              ></RegisterRoles>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
