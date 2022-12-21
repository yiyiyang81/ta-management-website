import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import LabeledInput from "../../common/LabeledInput";
import Button from "../../common/Button";
import ErrorBox from "../../common/ErrorBox";
import { createBackendUrl, callBackend } from "../../apiConfig";
import { User } from "../../classes/User";
import { OHResponsibilties } from "../../classes/OHResponsibilities";
import OHRow from "./OHRow";
import RespsRow from "./RespsRow";
import CheckIcon from "../../assets/images/check-icon.png";


const ViewOHResps = (props: {
    handleDisplayName: React.Dispatch<React.SetStateAction<any>>;
    handleOH: React.Dispatch<React.SetStateAction<any>>;
    handleOfficeLocation: React.Dispatch<React.SetStateAction<any>>;
    handleResponsibilities: React.Dispatch<React.SetStateAction<any>>;
    handleOHResponsibilities: React.FormEventHandler;
    ohrespsSuccess: boolean;
    user: User;
    missingFieldsError: boolean;
    courseName: string;
    displayName: string;
    officeHours: string;
    officeLocation: string;
    responsibilities: string;
}) => {

    const [ohs, setOHs] = useState<Array<OHResponsibilties>>([]);

    // get OH and Responsibilities for each member of the teaching staff
    const fetchOHData = async () => {
      try {

        // get instructor and TAs associated with the course
        const courseData = "course_number=" + props.courseName.split(" ")[0].toString(); 
        const urlProf = createBackendUrl("/api/course/1/prof?" + courseData);
        const urlTA = createBackendUrl("/api/course/1/ta?" + courseData);

        const resProf = await callBackend(urlProf);
        const resTA = await callBackend(urlTA)
      
        const dataProf = await resProf.json();
        const dataTA = await resTA.json();

        let emails = new Array();

        for (const p of dataProf.instructors) {
          emails.push(p.email);
        }

        for (const t of dataTA.course_TA) {
          emails.push(t.email);
        }

        let ohs = new Array();

        // get their office hours and responsibilities by their emails
        for (const e of emails) {
          const res = await callBackend("/api/ohresps/get?course_number=" + props.courseName.split(" ")[0] + "&email=" + e);
          const data = await res.json();

          if (!(JSON.stringify(data) === '{}')) {
            let labeledName = "";
            if (data.oh.is_instructor) {
              labeledName = data.oh.full_name + " (Instructor)"
            } else {
              labeledName = data.oh.full_name + " (TA)"
            }
            let item = {
              term_year: data.oh.term_year,
              course_number: data.oh.course_number,
              full_name: labeledName,
              email: data.oh.email,
              is_instructor:data.oh.is_instructor,
              office_hours: data.oh.office_hours,
              location: data.oh.location,
              responsibilities: data.oh.responsibilities,
            }
            ohs.push(item);
          }
        }

        setOHs(ohs);
          
      } catch (err) {
        console.error(err);
      }
  };

  useEffect(() => {
    fetchOHData();
  }, [props.courseName, props.ohrespsSuccess]);

  return (
    <>
    <div>
      <Container className="mt-3">
        <div className="mb-4">
        <h1> Office Hours and Responsibilities </h1>
        Define and view OHs and responsibilities of the teaching staff.
        </div>
            <div style={{ width:"40%", float:"left"}}>
            <LabeledInput
              label="Display Name"
              required={true}
              type="text"
              name="displayName"
              placeholder="Enter your preferred name..."
              id="displayName"
              value={props.displayName}
              handleChange={props.handleDisplayName}
            ></LabeledInput>
            <LabeledInput
              label="Office Hours"
              required={true}
              type="text"
              name="officeHours"
              placeholder='E.g., "MW 10:00am - 11:30am"'
              id="officeHours"
              value={props.officeHours}
              handleChange={props.handleOH}
            ></LabeledInput>
            <LabeledInput
              label="Office Location"
              required={true}
              type="text"
              name="officeLocation"
              placeholder='E.g., physical location or "Zoom"'
              id="officeLocation"
              value={props.officeLocation}
              handleChange={props.handleOfficeLocation}
            ></LabeledInput>
            <LabeledInput
              label="Responsibilities"
              required={true}
              type="text"
              name="responsibilities"
              placeholder="List your responsibilities..."
              id="responsibilities"
              value={props.responsibilities}
              handleChange={props.handleResponsibilities}
            ></LabeledInput>

            {props.missingFieldsError && (
              <div className="mb-2">
                <ErrorBox errorMessage="* Please fill in all required fields."></ErrorBox>
              </div>
            )}

            <form onSubmit={props.handleOHResponsibilities}>
              <Button
                width="15rem"
                type="submit-button"
                value="Save Changes"
              ></Button>
            </form>

          {props.ohrespsSuccess && (
          <div className="d-flex align-items-center mb-4">
              <img src={CheckIcon} height="20"></img>
              <div className="review-submitted-text">
              <b>Your changes have been saved!</b>
              </div>
          </div>
          )}
        </div>
        
      </Container>

      <div style={{ width:"50%", float:"right", fontSize:"15px"}}>

      <table className="table table-striped">
        <thead>
          <tr>
            <th className="column0"></th>
            <th className="column1">Teaching Staff</th>
            <th className="column2">Office Hours</th>
            <th className="column3">Location</th>
          </tr>
        </thead>
        <tbody>
          {ohs.map((oh: OHResponsibilties, i: number) => (
            <OHRow key={i} oh={oh} fetchOHData={fetchOHData} />
          ))}
        </tbody>
      </table>

      <div>
        <br></br>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th className="column0"></th>
            <th className="column1">Teaching Staff</th>
            <th className="column2">Responsibilities</th>
          </tr>
        </thead>
        <tbody>
          {ohs.map((resp: OHResponsibilties, i: number) => (
            <RespsRow key={i} resp={resp} fetchRespData={fetchOHData} />
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </>

  );
};

export default ViewOHResps;