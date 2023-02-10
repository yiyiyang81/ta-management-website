import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import Select from "../../common/Select";
import Button from "../../common/Button";
import { callBackend } from "../../apiConfig";
import ErrorBox from "../../common/ErrorBox";
import TextArea from "../../common/TextArea";
import CheckIcon from "../../assets/images/check-icon.png";

const AddPerformanceLog = (props: {
    handleAddLog: React.Dispatch<React.SetStateAction<any>>;
    handleLog: React.Dispatch<React.SetStateAction<any>>;
    handleLoggedTA: React.Dispatch<React.SetStateAction<any>>;
    adminLogError: boolean;
    performanceLogSuccess: boolean;
    missingTAError: boolean;
    courseName: string;
    performanceLog: string;
    loggedTA: string;
}) => {

    const [allTAs, setAllTAs] = React.useState<Array<String>>([]);
    const [log, setLog] = useState("");

    // goal: want user to see what they're typing in the text box
    const handleLogChange = (event: {
        target: { value: React.SetStateAction<string> };
      }) => {
        setLog(event.target.value);
    };

    // get all TAs associated with the selected course
    // goal: want to give a dropdown of all TAs for the prof to pick from
    const fetchTAData = async () => {
        try {
            const courseData = "course_number=" + props.courseName.split(" ")[0].toString();
            const res = await callBackend("/api/course/1/ta?" + courseData);

            let courseTAs = [];
            const data = await res.json();
            data.course_TA.forEach(c => {
                courseTAs.push(c.TA_name + " " + c.email);
            });
            setAllTAs(courseTAs);

        }  catch (err) {
            //console.error(err);
        }
    };

    // TAs associated with the course is retrieved when course selected
    useEffect(() => {
        fetchTAData();
    }, [props.courseName]);

    // update the log with the prof's notes when they submit
    useEffect(() => {
        props.handleLog(log);
    }, [log])

  return (
    <div>
      <Container className="mt-3">
        <div className="mb-4">
        <h1> Add a TA Performance Log </h1>
        Record an instructor's notes about TAs.
        </div>
        <div style={{width: "40%"}}>

            <Select
                label="Teaching Assistant"
                required={true}
                name="loggedTA"
                id="loggedTA"
                placeholder={
                    allTAs && allTAs.length !== 0
                  ? "Select a TA"
                  : "No TAs available"
                }
                options={allTAs}
                value={props.loggedTA}
                handleChange={props.handleLoggedTA}
            ></Select>

            <TextArea
                label="Performance Log"
                required={true}
                cols={29}
                rows={5}
                placeholder="Enter your performance log..."
                maxLength={255}
                id="performanceLog"
                value={log}
                handleChange={handleLogChange}
            ></TextArea>

            {props.missingTAError && (
              <div className="mb-2">
                <ErrorBox errorMessage="* Please select a TA and enter a log."></ErrorBox>
              </div>
            )}

            <form onSubmit={props.handleAddLog}>
              <Button
                width="15rem"
                type="submit-button"
                value="Save Performance Log"
              ></Button>
            </form>
            </div>

            {props.adminLogError && (
              <div className="mb-2">
                <ErrorBox errorMessage="* Only the selected course's professors can save their logs."></ErrorBox>
              </div>
            )}

            {props.performanceLogSuccess && (
                <div className="d-flex align-items-center mb-4">
                    <img src={CheckIcon} height="20"></img>
                    <div className="review-submitted-text">
                    <b>Your performance log has been saved!</b>
                    </div>
                </div>
        )}
      </Container>
    </div>
  );
};

export default AddPerformanceLog;
