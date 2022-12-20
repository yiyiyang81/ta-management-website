import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import React from "react";
import { Modal } from "react-bootstrap";
import "../../style/userTable.css";
import { UserTypes } from "../../enums/UserTypes";
import { callBackend } from "../../apiConfig";
import Button from "../../common/Button";
import LabeledInput from "../../common/LabeledInput";
import Password from "../../common/Password";
import { UserHelper } from "../../helpers/UserHelper";
import ErrorBox from "../../common/ErrorBox";
import TinyTile from "../../common/TinyTile";
import ManualAddIcon from "./../../assets/images/manual-add-icon.png";

function AddUserForm({ loadUserData }) {
  const [show, setShow] = useState(false);
  const [tempEmail, setTempEmail] = useState<string>("");
  const [tempFirstname, setTempFirstname] = useState<string>("");
  const [tempLastname, setTempLastname] = useState<string>("");
  const [tempUsername, setTempUsername] = useState<string>("");
  const [tempPassword, setTempPassword] = useState<string>("");
  const [tempUserType, setTempUserType] = useState<Array<UserTypes>>([]);
  const [uniqueEmailError, setUniqueEmailError] = useState(false);
  const [uniqueUsernameError, setUniqueUsernameError] = useState(false);
  const [displayEmptyFieldsError, setEmptyFieldsError] = useState(false);

  let validFields =
    tempEmail !== "" &&
    tempFirstname !== "" &&
    tempLastname !== "" &&
    tempUsername !== "" &&
    tempPassword !== "" &&
    tempUserType.length > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validFields ? setEmptyFieldsError(false) : setEmptyFieldsError(true);
    if (validFields) {
      const { emailExists, usernameExists } =
        await UserHelper.checkUniqueAccount(tempEmail, tempUsername);
      emailExists ? setUniqueEmailError(true) : setUniqueEmailError(false);
      usernameExists
        ? setUniqueUsernameError(true)
        : setUniqueUsernameError(false);
      if (!emailExists && !usernameExists) {
        try {
          const res = await callBackend("/api/users/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: tempEmail,
              first_name: tempFirstname,
              last_name: tempLastname,
              password: tempPassword,
              registered_courses: [],
              roles: tempUserType,
              student_id: "",
              term: "",
              username: tempUsername,
              year: "",
            }),
          });

          if (res.status === 200) {
            const data = await res.json();
            validFields = true;
            setShow(false);
            setTimeout(() => {
              loadUserData();
            }, 500);
          } else {
            alert("Error while adding user.");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  function handleCheckbox(e) {
    let existingUserTypes: UserTypes[] = [...tempUserType];
    if (e.target.checked) {
      existingUserTypes.push(e.target.value);
    } else {
      const index = existingUserTypes.indexOf(e.target.value);
      existingUserTypes.splice(index, 1);
    }
    setTempUserType(existingUserTypes);
  }

  return (
    <div>
      <TinyTile
        value="Manually add a user"
        image={ManualAddIcon}
        width="8rem"
        onClick={() => setShow(true)}
      ></TinyTile>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-lg"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add a User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <LabeledInput
                  required={true}
                  label="First Name"
                  placeholder="Enter the first name of the user..."
                  id="first-name"
                  name="first-name"
                  value={tempFirstname}
                  type="text"
                  handleChange={setTempFirstname}
                ></LabeledInput>
              </Col>
              <Col>
                <LabeledInput
                  required={true}
                  label="Last Name"
                  placeholder="Enter the last name of the user..."
                  id="last-name"
                  name="last-name"
                  value={tempLastname}
                  type="text"
                  handleChange={setTempLastname}
                ></LabeledInput>
              </Col>
            </Row>
            <Row>
              <Col>
                <LabeledInput
                  required={true}
                  label="Email"
                  placeholder="Enter the email of the user..."
                  id="email"
                  name="email"
                  value={tempEmail}
                  type="text"
                  handleChange={setTempEmail}
                ></LabeledInput>
              </Col>
            </Row>
            <Row>
              <Col>
                <LabeledInput
                  required={true}
                  label="Username"
                  placeholder="Enter the username of the user..."
                  id="username"
                  name="username"
                  value={tempUsername}
                  type="text"
                  handleChange={setTempUsername}
                ></LabeledInput>
              </Col>
            </Row>
            <Row>
              <Col>
                <Password
                  password={tempPassword}
                  handlePassword={setTempPassword}
                  placeholder="Enter the password of the user..."
                ></Password>
              </Col>
            </Row>

            <Row>
              <div className="mb-2">
                Register the user as:<span className="required-symbol"> *</span>
              </div>
              <Col>
                <Form.Check
                  inline
                  type="checkbox"
                  label="Student"
                  value="stud"
                  onChange={handleCheckbox}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Professor"
                  value="prof"
                  onChange={handleCheckbox}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="TA"
                  value="ta"
                  onChange={handleCheckbox}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Admin"
                  value="admin"
                  onChange={handleCheckbox}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Sysop"
                  value="sysop"
                  onChange={handleCheckbox}
                />
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
                value="Add User"
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

export default AddUserForm;
