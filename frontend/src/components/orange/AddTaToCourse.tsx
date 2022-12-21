import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "../../style/userTable.css";
import { callBackend } from "../../apiConfig";
import TinyTile from "../../common/TinyTile";
import ManualAddIcon from "./../../assets/images/manual-add-icon.png";

// Form that adds a course with fields: courseCode, courseNumber, courseName, term, year
const AddTaToCourse = ({ courseNumber, termYear, handleTAChange }) => {
    const [show, setShow] = React.useState(false);
    const [taEmail, setTAEmail] = React.useState("");

    const handleAddTA = async (e) => {
        try {
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
                setTAEmail("");
                handleTAChange();
            }
        } catch (e) {
            console.error(e);
            setTAEmail("");
            handleTAChange();
        }
    };

    return (
        <div>
            <TinyTile
                value="Manually add a TA"
                image={ManualAddIcon}
                width="8rem"
                onClick={() => setShow(true)}
            ></TinyTile>

            <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-lg" aria-labelledby="example-custom-modal-styling-title">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">Add a TA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddTA}>

                        <Row>
                            <Col>
                                <Form.Control required type="email" placeholder="Please enter TA's Email." value={taEmail} onChange={(e) => setTAEmail(e.target.value)} />
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
