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
import { callBackend } from "../apiConfig";
import RegistrationCompleted from "../components/registration/RegistrationCompleted";

const Registration: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState("Account Registration");

  // On Registration Success
  const [isSuccess, setIsSuccess] = useState(false);

  // Account Registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accountError, setAccountError] = useState(false);
  const [uniqueUsernameError, setUniqueUsernameError] = useState(false);
  const [uniqueEmailError, setUniqueEmailError] = useState(false);


  // Course Registration
  const [term, setTerm] = useState("default");
  const [year, setYear] = useState("default");
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
  enum DisplayedRoleEnums {
    "Student" = "stud",
    "Teaching Assistant" = "ta",
    "Professor" = "prof",
    "TA Administrator" = "admin",
    "System Operator" = "sysop",
  }

  const availableRoles = [
    "Student",
    "Teaching Assistant",
    "Professor",
    "TA Administrator",
    "Sysop",
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

  const isValidAccountFields =
    firstName !== "" &&
    lastName !== "" &&
    email !== "" &&
    username !== "" &&
    password !== "";
  const isValidRole = roles.length > 0;

  const checkUniqueAccount = async () => {
    try {
      const res = await callBackend(`/api/users/checkValidAccount/${email}/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await res.json()
    } catch (err) {
      console.log(err);
    }
  };
  // Navigation handlers
  const handleRegisterCoursesClick = async () => {
    if (isValidAccountFields) {
      setAccountError(false)
      const {emailExists, usernameExists} = await checkUniqueAccount()
      emailExists ? setUniqueEmailError(true) : setUniqueEmailError(false)
      usernameExists ? setUniqueUsernameError(true) : setUniqueUsernameError(false)
      if (!emailExists && !usernameExists){     
        setFormState("Course Registration");
      }
    } else {
      setAccountError(true);
    }
  };

  const convertRoles = (roles: string[]) => {
    return roles.map((role) => DisplayedRoleEnums[role]);
  };

  const submitRegistration = async (e: any) => {
    e.preventDefault();
    if (isValidRole) {
      try {
        const res = await callBackend("/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: password,
            registered_courses: [],
            roles: convertRoles(roles),
            student_id: studentId,
            term: term,
            username: username,
            year: year,
          }),
        });

        if (res.status === 200) {
          setIsSuccess(true);
        } else {
          alert("Error while adding user.");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setRoleError(true);
    }
  };

  return (
    <div className="registration-container">
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
        {!isSuccess && (
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
                  displayAccountError={accountError}
                  displayUniqueEmailError={uniqueEmailError}
                  displayUniqueUsernameError={uniqueUsernameError}
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
        )}
        <div className="text-center">
          {isSuccess && <RegistrationCompleted></RegistrationCompleted>}
        </div>
      </div>
    </div>
  );
};

export default Registration;
