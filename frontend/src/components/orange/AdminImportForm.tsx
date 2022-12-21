import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import React from "react";
import { Modal } from "react-bootstrap";
import "../../style/userTable.css";
import { FileDownload } from "@mui/icons-material";

function AdminImportForm({ taskName, uploadUrl, fileType }: { taskName: string, uploadUrl: string, fileType: string }) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();

  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  const generateWidthStyle = () => {
    return {
      minWidth: "100%",
      maxWidth: "15 rem",
      width: "100%",
    };
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(false);
    const formData = new FormData();
    formData.append('csvFile', file);
    try {
      const res = await fetch(uploadUrl + `/${fileType}`, {
        method: "POST",
        body: formData
      });

      if (res.status === 200) {
        const data = await res.json();
        let message = data.return_messages.join("\n");
        alert(message);
      } else {
        if (fileType === "tacohort") {
          alert("Error while adding TA.");
        }
        else {
          alert("Error while adding Course Quota.");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="ta-review-modal">
      <div className="ta-admin-button-container">
        <button className="primary-button"
          style={generateWidthStyle()} onClick={() => setShow(true)}>
          <FileDownload /> Import
        </button>
      </div>
      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-md" aria-labelledby="example-custom-modal-styling-title">
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">{`Import ${taskName}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control required type="file" name="csvFile" onChange={(e) => handleChange(e)} />
            </Form.Group>

            <Button variant="outline-secondary" type="submit">
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div >
  );
}

export default AdminImportForm;
