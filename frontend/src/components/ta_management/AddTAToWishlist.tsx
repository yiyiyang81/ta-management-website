import React, { useEffect } from "react";
import "../../style/userTable.css";
import { Container } from "react-bootstrap";
import Select from "../../common/Select";
import Button from "../../common/Button";
import { callBackend } from "../../apiConfig";
import ErrorBox from "../../common/ErrorBox";
import CheckIcon from "../../assets/images/check-icon.png";

const AddTAToWishlist = (props: {
  handleTA: React.Dispatch<React.SetStateAction<any>>;
  handleAddTA: React.Dispatch<React.SetStateAction<any>>;
  handleTerm: React.Dispatch<React.SetStateAction<any>>;
  handleYear: React.Dispatch<React.SetStateAction<any>>;
  adminWishlistError: boolean;
  wishedTASuccess: boolean;
  missingInfoError: boolean;
  courseName: string;
  wishedTA: string
  wishedTerm: string,
  wishedYear: string
}) => {

  const [allTAs, setAllTAs] = React.useState<Array<String>>([]);

  const allTerms = ["Winter", "Fall", "Summer"]
  const allYears = [new Date().getFullYear().toString(), (new Date().getFullYear() + 1).toString()]

  // get all TAs associated with the selected course
  // goal: want a dropdown of all TAs off the selected course for the prof to pick
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

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTAData();
  }, [props.courseName]);

  return (
    <div>
      <Container className="mt-3">
        <div className="mb-4">
          <h1> Add TA to Wishlist </h1>
          Indicate instructor's TA preferences for next semester.
        </div>
        <div style={{ width: "40%" }}>
          <div className="form-horizontal-container">
            <div className="form-horizontal-subcontainer">
              <Select
                label="Next Term"
                required={true}
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
                required={true}
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
            required={true}
            name="wishedTA"
            id="wishedTA"
            placeholder={
              allTAs && allTAs.length !== 0
                ? "Select a TA"
                : "No TAs available"
            }
            options={allTAs}
            value={props.wishedTA}
            handleChange={props.handleTA}
          ></Select>

          {props.missingInfoError && (
            <div className="mb-2">
              <ErrorBox errorMessage="* Please select an item for all above fields."></ErrorBox>
            </div>
          )}

          <form onSubmit={props.handleAddTA}>
            <Button
              width="15rem"
              type="submit-button"
              value="Save Preferences"
            ></Button>
          </form>

          {props.adminWishlistError && (
            <div className="mb-2">
              <ErrorBox errorMessage="* Only the selected course's professors can add to their TA wishlist."></ErrorBox>
            </div>
          )}

          {props.wishedTASuccess && (
            <div className="d-flex align-items-center mb-4">
              <img src={CheckIcon} height="20"></img>
              <div className="review-submitted-text">
                <b>Your preferences have been saved!</b>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default AddTAToWishlist;
