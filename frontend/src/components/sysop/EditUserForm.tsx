import { useContext, useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import React from "react";
import { Modal } from "react-bootstrap";
import "../../style/userTable.css";
import Button from "../../common/Button";
import LabeledInput from "../../common/LabeledInput";
import Password from "../../common/Password";
import { UserHelper } from "../../helpers/UserHelper";
import ErrorBox from "../../common/ErrorBox";
import editIcon from "../../assets/images/edit-icon.png";
import { getDisplayedUserTypesKey } from "../../enums/UserTypes";
import CoursesDropdown from "../../common/CoursesDropdown";
import { UserContext } from "../../App";
import Select from "../../common/Select";
import { CourseHelper } from "../../helpers/CourseHelper";

const hasSelectedOne = (object) => {
  return Object.values(object).filter((el) => el).length > 0;
};

function EditUserForm({ loadUserData, user }) {
  const [show, setShow] = useState(false);
  const { user: contextUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState<string>(user.first_name);
  const [lastName, setLastname] = useState<string>(user.last_name);
  const [studentId, setStudentId] = useState(user.student_id);
  const [email, setEmail] = useState<string>(user.email);
  const [username, setUsername] = useState<string>(user.username);
  const [password, setPassword] = useState<string>("");
  const [chooseNewPassword, setChooseNewPassword] = useState(false);

  // Term Year
  const termYear = user.semester ? user.semester.split(" ") : ["", ""];
  const initialTerm = termYear[0];
  const initialYear = termYear[1];
  const [term, setTerm] = useState(initialTerm);
  const [year, setYear] = useState(initialYear);
  const allTerms = ["Fall", "Winter", "Summer"];
  const allYears = () => {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 5))
      .fill("")
      .map((v, idx) => now - idx) as Array<number>;
  };

  // Courses

  const [registeredCourses, setRegisteredCourses] = useState([]);
  const setInitialCourses = async () => {
    const courses = await CourseHelper.getCoursesByCoursesId(
      user.registered_courses
    );
    const courseFullNames = courses.map((c) =>
      CourseHelper.createCourseFullName(c["courseNumber"], c["courseName"])
    );
    setRegisteredCourses(courseFullNames);
  };

  const handleRegisteredCourses = (value: string) => {
    if (registeredCourses.filter((val) => val === value).length > 0) {
      setRegisteredCourses(
        registeredCourses.filter((course) => course !== value)
      );
    } else {
      setRegisteredCourses(registeredCourses.concat([value]));
    }
  };

  useEffect(() => {
    setInitialCourses();
  }, [user]);

  // Errors
  const [uniqueEmailError, setUniqueEmailError] = useState(false);
  const [uniqueUsernameError, setUniqueUsernameError] = useState(false);
  const [displayEmptyFieldsError, setEmptyFieldsError] = useState(false);

  // Checkboxes for user types
  const isSysop = contextUser.user_types.filter((e) => e === "sysop");
  const trueCheckboxes = {};
  for (let userType of user.user_types) {
    trueCheckboxes[userType] = true;
  }
  const falseCheckboxes = {
    stud: false,
    ta: false,
    prof: false,
    admin: false,
    sysop: false,
  };
  const initialCheckboxState = Object.assign(
    {},
    falseCheckboxes,
    trueCheckboxes
  );
  const [checkboxes, setCheckboxes] = useState(initialCheckboxState);
  let validFields =
    email !== "" &&
    firstName !== "" &&
    lastName !== "" &&
    username !== "" &&
    hasSelectedOne(checkboxes);

  const convertCheckboxes = (checkboxes) => {
    const roles = [];
    for (let key in checkboxes) {
      let value = checkboxes[key];
      if (value) {
        roles.push(key);
      }
    }
    return roles;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validFields ? setEmptyFieldsError(false) : setEmptyFieldsError(true);
    if (validFields) {
      const { emailExists, usernameExists } =
        await UserHelper.checkUniqueAccount(email, username);
      const canEditEmail = !emailExists || (emailExists && email == user.email);
      const canEditUsername =
        !usernameExists || (usernameExists && username == user.username);
      emailExists && email !== user.email
        ? setUniqueEmailError(true)
        : setUniqueEmailError(false);
      usernameExists && username !== user.username
        ? setUniqueUsernameError(true)
        : setUniqueUsernameError(false);

      if (canEditEmail && canEditUsername) {
        const status = await UserHelper.editUser(
          {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            registeredCourses:
              CourseHelper.convertCourseFullNamesToCourseNumbers(
                registeredCourses
              ),
            roles: convertCheckboxes(checkboxes),
            studentId: studentId,
            username: username,
            term: term,
            year: year,
          },
          user.email
        );
        if (status === 200) {
          validFields = true;
          setTimeout(() => {
            loadUserData();
          });
          setShow(false);
        }
      }
    }
  };

  function handleCheckbox(e) {
    const key = e.target.value;
    const value = !!e.target.checked;
    setCheckboxes((checkboxes) => {
      const newObject = Object.assign({}, checkboxes, { [key]: value });
      return newObject;
    });
  }

  return (
    <div>
      <img
        src={editIcon}
        height={15}
        style={{cursor: "pointer" }}
        onClick={() => setShow(true)}
      ></img>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-lg"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Edit a User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <LabeledInput
                  required={true}
                  label="First Name"
                  id="first-name"
                  name="first-name"
                  value={firstName}
                  type="text"
                  handleChange={setFirstName}
                ></LabeledInput>
              </Col>
              <Col>
                <LabeledInput
                  required={true}
                  label="Last Name"
                  id="last-name"
                  name="last-name"
                  value={lastName}
                  type="text"
                  handleChange={setLastname}
                ></LabeledInput>
              </Col>
            </Row>
            <Row>
              <Col>
                <LabeledInput
                  required={false}
                  label="Student ID"
                  id="student-id"
                  name="student-id"
                  value={studentId}
                  type="text"
                  handleChange={setStudentId}
                ></LabeledInput>
              </Col>
            </Row>
            <Row>
              <Col>
                <LabeledInput
                  required={true}
                  label="Email"
                  id="email"
                  name="email"
                  value={email}
                  type="text"
                  handleChange={setEmail}
                ></LabeledInput>
              </Col>
            </Row>
            <Row>
              <Col>
                <LabeledInput
                  required={true}
                  label="Username"
                  id="username"
                  name="username"
                  value={username}
                  type="text"
                  handleChange={setUsername}
                ></LabeledInput>
              </Col>
            </Row>

            <Row>
              <Col className="d-flex">
                <div style={{ marginRight: "0.5rem" }}>
                  Choose a new password?{" "}
                </div>
                <Form.Check
                  inline
                  type="checkbox"
                  onChange={(e) => setChooseNewPassword(e.target.checked)}
                  checked={chooseNewPassword}
                />
              </Col>
            </Row>
            <Row>
              {chooseNewPassword && (
                <Password
                  password={password}
                  placeholder=""
                  handlePassword={setPassword}
                ></Password>
              )}
            </Row>
            <Row>
              <Col>
                <Select
                  label="Winter / Fall"
                  required={false}
                  name="term"
                  id="term"
                  options={allTerms}
                  value={term}
                  handleChange={setTerm}
                ></Select>
              </Col>
              <Col>
                <Select
                  label="Year"
                  required={false}
                  name="year"
                  id="year"
                  options={allYears()}
                  value={year}
                  handleChange={setYear}
                ></Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <CoursesDropdown
                  registeredCourses={registeredCourses}
                  margin="0rem 0.6rem"
                  handleRegisteredCourses={handleRegisteredCourses}
                ></CoursesDropdown>
              </Col>
            </Row>
            <Row>
              <div className="mb-2">
                Register the user as:<span className="required-symbol"> *</span>
              </div>
              <Col>
                {Object.entries(checkboxes).map(([userType, isChecked], i) => {
                  return (
                    <Form.Check
                      inline
                      type="checkbox"
                      key={i}
                      label={getDisplayedUserTypesKey[userType]}
                      onChange={handleCheckbox}
                      checked={isChecked}
                      value={userType}
                      disabled={isSysop && user.email == contextUser.email && userType === "sysop"}
                    />
                  );
                })}
              </Col>
            </Row>
            <Row>
              {displayEmptyFieldsError && (
                <div className="mb-2">
                  <ErrorBox errorMessage="* Please fill in all the required fields."></ErrorBox>
                </div>
              )}
              {uniqueEmailError && (
                <div className="mb-2">
                  <ErrorBox errorMessage="* An account with this email already exists. Please choose a different email."></ErrorBox>
                </div>
              )}
              {uniqueUsernameError && (
                <div className="mb-2">
                  <ErrorBox errorMessage="* An account with this username already exists. Please choose a different username."></ErrorBox>
                </div>
              )}
            </Row>
            <div style={{ width: "10rem", float: "right" }}>
              <Button
                value="Edit User"
                type="submit"
                onClick={handleSubmit}
              ></Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditUserForm;
