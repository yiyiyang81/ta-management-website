import { useState } from "react";
import { Form } from "react-bootstrap";
import React from "react";
import { Modal } from "react-bootstrap";
import "../../style/userTable.css";
import CsvIcon from "./../../assets/images/csv-icon.png";
import TinyTile from "./../../common/TinyTile";
import Button from "../../common/Button";
function ImportForm({
  taskName,
  uploadUrl,
  loadFunction,
}: {
  taskName: string;
  uploadUrl: string;
  loadFunction: Function;
}) {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShow(false);
    const formData = new FormData();
    formData.append("csvFile", file);
    try {
      console.log(uploadUrl);
      const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (res.status === 200) {
        loadFunction();
      } else {
        alert("Error while adding user.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="ta-review-modal">
      <TinyTile
        value="Import a CSV"
        image={CsvIcon}
        width="8rem"
        onClick={() => setShow(true)}
      ></TinyTile>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-md"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">{`Import ${taskName}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload your CSV:</Form.Label>
              <Form.Control
                required
                type="file"
                name="csvFile"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <div>
              <Button
                type="submit"
                value="Upload CSV"
                onClick={handleSubmit}
              ></Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ImportForm;
