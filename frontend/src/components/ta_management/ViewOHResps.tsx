import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import LabeledInput from "../../common/LabeledInput";
import Button from "../../common/Button";
import ErrorBox from "../../common/ErrorBox";

const ViewOHResps = (props: {
    handleDisplayName: React.Dispatch<React.SetStateAction<any>>;
    handleOH: React.Dispatch<React.SetStateAction<any>>;
    handleOfficeLocation: React.Dispatch<React.SetStateAction<any>>;
    handleResponsibilities: React.Dispatch<React.SetStateAction<any>>;
    handleOHResponsibilities: React.FormEventHandler;
    courseName: string,
    displayName: string,
    officeHours: string,
    officeLocation: string,
    responsibilities: string
}) => {

  useEffect(() => {
  }, []);

  return (
    <div>
      <Container>
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