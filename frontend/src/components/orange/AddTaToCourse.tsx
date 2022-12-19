import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import "../../style/userTable.css";
import { callBackend } from "../../apiConfig";

// Form that adds a course with fields: courseCode, courseNumber, courseName, term, year
const AddTaToCourse = ({ courseNumber, termYear }) => {
    const [show, setShow] = React.useState(false);
    const [taEmail, setTAEmail] = React.useState("");

    const handleAddTA = async (e) => {
        try {
            console.log(taEmail);
            const res = await callBackend("/api/course/:id/ta/:id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    course_number: courseNumber,
                    term_year: termYear,
                    email: taEmail
                }),
            });
            if (res.status === 201) {
                    setShow(false);
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
                    <Modal.Title id="example-custom-modal-styling-title">Add a TA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddTA}>

                        <Row>
                            <Col>
                                <Form.Control required type="email" placeholder="Please enter TA's Email seperate by comma." value={taEmail} onChange={(e) => setTAEmail(e.target.value)} />
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

export default AddTaToCourse;