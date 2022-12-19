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

const ViewOHResps = (props: {
    handleDisplayName: React.Dispatch<React.SetStateAction<any>>;
    handleOH: React.Dispatch<React.SetStateAction<any>>;
    handleOfficeLocation: React.Dispatch<React.SetStateAction<any>>;
    handleResponsibilities: React.Dispatch<React.SetStateAction<any>>;
    handleOHResponsibilities: React.FormEventHandler;
    user: User;
    missingFieldsError: boolean;
    courseName: string,
    displayName: string,
    officeHours: string,
    officeLocation: string,
    responsibilities: string
}) => {

    const [ohs, setOHs] = useState<Array<OHResponsibilties>>([]);
    const [resps, setResps] = useState<Array<OHResponsibilties>>([]);

    /*const fetchOHData = async () => {
      try {

        // get instructor and TAs associated with the course
        const courseData = "course_number=" + props.courseName.split(" ")[0].toString(); 
        const urlProf = createBackendUrl("/api/course/1/prof?" + courseData);
        const urlTA = createBackendUrl("/api/course/1/ta?" + courseData);


        const resProf = await callBackend(urlProf);
        const resTA = await callBackend(urlTA)

        console.log(resProf)
      
        const dataProf = await resProf.json();
        const dataTA = await resTA.json();

        let emails = new Array();

        emails.push(dataProf.email)

        for (const t of dataProf.instructors) {
          emails.push(t.email);
        }

        for (const t of dataTA.course_TA) {
          emails.push(t.email);
        }

        let ohs = new Array();

        // get their office hours and responsibilities by their emails
        for (const e of emails) {
          const res = await callBackend("/api/ohresps/get?course_number" + props.courseName.split(" ")[0] + "&email=" + e);
          const data = await res.json();

          if (data === "{}") {
            //
          } else {
            let item = {
              term_year: data.oh.term_year,
              course_number: data.oh.course_number,
              full_name: data.oh.full_name,
              email: data.oh.email,
              is_instructor:data.oh.is_instructor,
              office_hours: data.oh.office_hours,
              office_location: data.oh.office_location,
              responsibilities: data.oh.responsibilities,
            }

            ohs.push(item);
          }
        }
        console.log(ohs);
        setOHs(ohs);
          
      } catch (err) {
        console.error(err);
      }
  };*/

  useEffect(() => {
    //fetchOHData();
  }, [props.courseName]);

  return (
    <div>
      <Container className="mt-3">
        <h1> Office Hours and Responsibilities </h1>
        <div>
        Define and view OHs and responsibilities of the teaching staff.
        </div>


            <div style={{ width:"40%", float:"left"}}>
            <LabeledInput
              label="Display Name"
              required={true}
              type="text"
              name="displayName"
              id="displayName"
              value={props.displayName}
              handleChange={props.handleDisplayName}
            ></LabeledInput>
            <LabeledInput
              label="Office Hours"
              required={true}
              type="text"
              name="officeHours"
              id="officeHours"
              value={props.officeHours}
              handleChange={props.handleOH}
            ></LabeledInput>
            <LabeledInput
              label="Office Location"
              required={true}
              type="text"
              name="officeLocation"
              id="officeLocation"
              value={props.officeLocation}
              handleChange={props.handleOfficeLocation}
            ></LabeledInput>
            <LabeledInput
              label="Responsibilities"
              required={true}
              type="text"
              name="responsibilities"
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
          </div>
        
      </Container>

        <div style={{ width:"50%", float:"right", fontSize:"13px"}}>
        <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Teaching Staff</th>
            <th scope="col">Office Hours</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Santa Claus</th>
            <td>Bake cookies, buy a new sleigh, feed the reindeers.</td>
          </tr>
          <tr>
            <th scope="row">Rudolph Reindeer</th>
            <td>Make sure other reindeers know about the meet-up spot.</td>
          </tr>
        </tbody>
      </table>

      <div>
        <br></br>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Teaching Staff</th>
            <th scope="col">Responsibilities</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Santa Claus</th>
            <td>Bake cookies, buy a new sleigh, feed the reindeers.</td>
          </tr>
          <tr>
            <th scope="row">Rudolph Reindeer</th>
            <td>Make sure other reindeers know about the meet-up spot.</td>
          </tr>
        </tbody>
      </table>
      </div>

    </div>
  );
};

export default ViewOHResps;