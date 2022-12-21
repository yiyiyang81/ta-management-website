import React, { useState } from "react";
import { Modal, Form, Row, Col } from "react-bootstrap";
import "../../style/userTable.css";
import { callBackend } from "../../apiConfig";
import ManualAddIcon from "./../../assets/images/manual-add-icon.png";
import TinyTile from "../../common/TinyTile";
import LabeledInput from "../../common/LabeledInput";
import Button from "../../common/Button";
import { CourseHelper } from "../../helpers/CourseHelper";
import Select from "../../common/Select";
import ErrorBox from "../../common/ErrorBox";

// Form that adds a course with fields: courseCode, courseNumber, courseName, term, year
const AddCourseForm = ({ loadAllData }) => {
  const [show, setShow] = useState(false);
  const [courseDesc, setCourseDesc] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [courseName, setCourseName] = useState("");
  const [term, setTerm] = useState("default");
  const [year, setYear] = useState("default");
  const [instructor, setInstructor] = React.useState("");
  const [uniqueCourseError, setUniqueCourseError] = useState(false);
  const [displayEmptyFieldsError, setEmptyFieldsError] = useState(false);
  const allTerms = ["Fall", "Winter", "Summer"];
  const allYears = () => {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 5))
      .fill("")
      .map((v, idx) => now - idx) as Array<number>;
  };
  let validFields =
    courseDesc !== "" &&
    courseNumber !== "" &&
    courseName !== "" &&
    term !== "" &&
    year !== "" &&
    instructor !== "";

  const handleAddCourse = async (e) => {
    e.preventDefault();
    validFields ? setEmptyFieldsError(false) : setEmptyFieldsError(true);
    const { courseExists } = await CourseHelper.checkUniqueCourse(
      courseNumber, term, year
    );
    courseExists
      ? setUniqueCourseError(true)
      : setUniqueCourseError(false);
    if (validFields) {
      if (!courseExists) {
        try {
          const res = await callBackend("/api/course/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              course_description: courseDesc,
              course_number: courseNumber,
              course_name: courseName,
              term_year: `${term} ${year}`,
              course_instructors: [instructor],
            }),
          });
          if (res.status === 201) {
            setTimeout(() => {
              loadAllData();
              setShow(false);
            }, 500);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  return (
    <div>
      <TinyTile
        value="Manually add a course"
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
            Add a Course
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCourse}>
            <Row>
              <Col>
                <LabeledInput
                  required={true}
                  label="Course Number"
                  placeholder="Please enter the course number."
                  id="course-number"
                  name="course-number"
                  value={courseNumber}
                  type="text"
                  handleChange={setCourseNumber}
                ></LabeledInput>
              </Col>
            </Row>

            <Row>
              <Col>
                <LabeledInput
                  required={true}
                  label="Course Name"
                  placeholder="Please enter the course name."
                  id="course-name"
                  name="course-name"
                  value={courseName}
                  type="text"
                  handleChange={setCourseName}
                ></LabeledInput>
              </Col>
            </Row>
            <Row>
              <Col>
                <LabeledInput
                  required={true}
                  label="Course Description"
                  placeholder="Please enter the course description."
                  id="course-description"
                  name="course-description"
                  value={courseDesc}
                  type="text"
                  handleChange={setCourseDesc}
                ></LabeledInput>
              </Col>
            </Row>

            <Row>
              <Col>
                <Select
                  label="Course Term"
                  required={true}
                  name="term"
                  id="term"
                  options={allTerms}
                  value={term}
                  handleChange={setTerm}
                ></Select>
              </Col>

              <Col>
                <Select
                  label="Course Year"
                  required={true}
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
                <LabeledInput
                  required={true}
                  label="Course Instructor's Email"
                  placeholder="Please enter Course Instructor's Email"
                  id="instructor"
                  name="instructor"
                  value={instructor}
                  type="text"
                  handleChange={setInstructor}
                ></LabeledInput>
              </Col>
            </Row>
            <Row>
              {uniqueCourseError && (
                <div className="mb-2">
                  <ErrorBox errorMessage="* A course with this course number and term year already exists. Please create a different course."></ErrorBox>
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
                value="Add Course"
                type="submit"
                onClick={handleAddCourse}
              ></Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCourseForm;
