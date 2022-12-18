import React, { useEffect, useState } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import Select from "../../common/Select";
import Button from "../../common/Button";
import { createBackendUrl, callBackend } from "../../apiConfig";

const AddTAToWishlist = (props: {
    handleTA: React.Dispatch<React.SetStateAction<any>>;
    handleAddTA: React.Dispatch<React.SetStateAction<any>>;
    handleTerm: React.Dispatch<React.SetStateAction<any>>;
    handleYear: React.Dispatch<React.SetStateAction<any>>;
    courseName: string;
    wishedTA: string
    wishedTerm: string,
    wishedYear: string
}) => {

    const [allTAs, setAllTAs] = React.useState<Array<String>>([]);

    const allTerms = ["Winter", "Fall", "Summer"]
    const allYears = ["2022", "2023"] // TODO: get years

    const fetchTAData = async () => {
        try {
            const courseData = "course_number=" + props.courseName.split(" ")[0].toString();
            const url = createBackendUrl("/api/course/1/ta?" + courseData);
            const res = await callBackend(url);

            let courseTAs = new Array();
            const data = await res.json();
            data.course_TA.forEach(c => {
                courseTAs.push(c.name + " " + c.email);
            })

            setAllTAs(courseTAs);
            
        }  catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTAData();
    }, [props.courseName]);

  return (
    <div>
      <Container className="mt-3">
        <h1> Add TA to Wishlist </h1>
        Indicate instructor's TA preferences for next semester.
        <div style={{width: "40%"}}>
        <div className="form-horizontal-container">
          <div className="form-horizontal-subcontainer">
            <Select
              label="Term"
              required={false}
              name="term"
              id="term"
              options={allTerms}
              value={props.wishedTerm}
              handleChange={props.handleTerm}
            ></Select>
          </div>
          <div className="form-horizontal-subcontainer">
            <Select
              label="Year"
              required={false}
              name="year"
              id="year"
              options={allYears}
              value={props.wishedYear}
              handleChange={props.handleYear}
            ></Select>
          </div>
        </div>
            <Select
                label="Teaching Assistant"
                required={false}
                name="wishedTA"
                id="wishedTA"
                options={allTAs}
                value={props.wishedTA}
                handleChange={props.handleTA}
            ></Select>

            <form onSubmit={props.handleAddTA}>
              <Button
                width="15rem"
                type="submit-button"
                value="Save Preferences"
              ></Button>
            </form>
        </div>
      </Container>
    </div>
  );
};

export default AddTAToWishlist;