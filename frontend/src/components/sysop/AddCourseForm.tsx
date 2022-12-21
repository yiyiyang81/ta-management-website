import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import "../../style/userTable.css";
import { callBackend } from "../../apiConfig";

// Form that adds a course with fields: courseCode, courseNumber, courseName, term, year
const AddCourseForm = ({ loadCoursesData }) => {
  const [show, setShow] = React.useState(false);
  const [course_number, setCourseNumber] = React.useState("");
  const [course_name, setCourseName] = React.useState("");
  const [term_year, setTermYear] = React.useState("");
  const [course_instructors, setInstructor] = React.useState("");
  const [course_description, setCourseDesc] = React.useState("");

  const handleAddCourse = async (e) => {
    try {
      const res = await callBackend("/api/course/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_number: course_number,
          course_name: course_name,
          term_year: term_year,
          course_instructors: course_instructors,
          course_description: course_description,
        }),
      });
      if (res.status === 201) {
        setTimeout(() => {
          loadCoursesData();
          setShow(false);
        }, 500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <button className="mb-4 mt-2" onClick={() => setShow(true)}>
        <AddIcon />
      </button>

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-lg" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">Add a Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCourse}>

            <Row>
              <Col>
                <Form.Control required type="courseNumber" placeholder="Please enter the course number." value={course_number} onChange={(e) => setCourseNumber(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="courseName" placeholder="Please enter the course name." value={course_name} onChange={(e) => setCourseName(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="courseDesc" placeholder="Please enter the course description." value={course_description} onChange={(e) => setCourseDesc(e.target.value)} />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Control required type="term_year" placeholder="Please enter the course term." value={term_year} onChange={(e) => setTermYear(e.target.value)} />
              </Col>
            </Row>
            
            <Row>
              <Col>
                <Form.Control required type="email" placeholder="Please enter Course Instructor's Email seperate by comma." value={course_instructors} onChange={(e) => setInstructor(e.target.value)} />
              </Col>
            </Row>

            
            <Button className="mt-3" variant="light" type="submit">
              Add
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddCourseForm;
