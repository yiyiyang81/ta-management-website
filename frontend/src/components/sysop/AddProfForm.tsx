import { useEffect, useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import React from "react";
import "../../style/userTable.css";
import { callBackend } from "../../apiConfig";
import ManualAddIcon from "./../../assets/images/manual-add-icon.png";
import TinyTile from "../../common/TinyTile";
import LabeledInput from "../../common/LabeledInput";
import Select from "../../common/Select";
import Button from "../../common/Button";
import ErrorBox from "../../common/ErrorBox";
import { ProfHelper } from "../../helpers/ProfHelper";
import { CourseHelper } from "../../helpers/CourseHelper";

function AddProfForm({ loadProfsData }) {
  const [show, setShow] = useState(false);
  const [tempEmail, setTempEmail] = useState<string>();
  const [tempFaculty, setTempFaculty] = useState<string>("default");
  const [tempDept, setTempDept] = useState<string>("default");
  const [tempCourses, setTempCourses] = useState<string>("default");
  const [allCourses, setAllCourses] = useState();
  const allFaculties = ["Science", "Engineering", "Arts"];
  const allDept = ["Computer Science", "Mathematics", "Physics"];
  const [uniqueEmailError, setUniqueEmailError] = useState(false);
  const [displayEmptyFieldsError, setEmptyFieldsError] = useState(false);
  
  const loadCourseNames = async () => {
    const allCourses = await CourseHelper.fetchCourseNames()
    const allNames = allCourses.map(course => CourseHelper.createCourseFullNameWithTerm(course.courseNumber, course.courseName, course.term, course.year))
    setAllCourses(allNames)
  }

  useEffect(() => {
   loadCourseNames()
  },[]);


  let validFields =
    tempEmail !== "" &&
    tempFaculty !== "" &&
    tempDept !== "default" &&
    tempCourses !== "default";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validFields ? setEmptyFieldsError(false) : setEmptyFieldsError(true);
    if (validFields) {
      const { emailExists } = await ProfHelper.checkUniqueEmail(tempEmail);
      emailExists ? setUniqueEmailError(true) : setUniqueEmailError(false);
      const {courseNumber, termYear} = CourseHelper.convertCourseNameTerm(tempCourses)
      if (!emailExists) {
        try {
          const res = await callBackend("/api/prof/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: tempEmail,
              faculty: tempFaculty,
              department: tempDept,
              course_number: courseNumber,
              term_year: termYear,
            }),
          });
          if (res.status === 200) {
            await res.json();
            setTimeout(() => {
              loadProfsData();
            }, 500);
            setShow(false);
          } else {
            alert("Error while adding professor details.");
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <div>
      <TinyTile
        value="Manually add professor"
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
            Add a Professor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <LabeledInput
                  required={true}
                  label="Instructor Email"
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
                <Select
                  label="Faculty"
                  required={true}
                  name="faculty"
                  id="faculty"
                  options={allFaculties}
                  value={tempFaculty}
                  handleChange={setTempFaculty}
                ></Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Select
                  label="Department"
                  required={true}
                  name="department"
                  id="department"
                  options={allDept}
                  value={tempDept}
                  handleChange={setTempDept}
                ></Select>
              </Col>
            </Row>
            <Row>
              <Col>
                <Select
                  label="Course"
                  required={true}
                  name="course-number"
                  id="course-number"
                  options={allCourses}
                  value={tempCourses}
                  handleChange={setTempCourses}
                ></Select>
              </Col>
            </Row>
            <Row>
              {uniqueEmailError && (
                <div className="mb-2">
                  <ErrorBox errorMessage="* A professor with this email already exists. Please choose a different email."></ErrorBox>
                </div>
              )}
              {displayEmptyFieldsError && (
                <div className="mb-2">
                  <ErrorBox errorMessage="* Please fill in all the required fields."></ErrorBox>
                </div>
              )}
            </Row>
            <div style={{ width: "10rem", float: "right" }}>
              <Button
                value="Add Professor"
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

export default AddProfForm;
