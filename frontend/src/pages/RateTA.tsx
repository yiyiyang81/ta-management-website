import React, { useEffect, useState } from "react";
import Select from "../common/Select";
import Rating from "../common/Rating";
import TextArea from "../common/TextArea";
import "../style/rateTA.css";
import { callBackend } from "../apiConfig";
import ErrorBox from "../common/ErrorBox";
import Button from "../common/Button";
import CheckIcon from "../assets/images/check-icon.png";

const RateTA = () => {
  const [ratingError, setRatingError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [termYear, setTermYear] = useState("default");
  const [courseName, setCourseName] = useState("default");
  const [taEmail, setTAEmail] = useState("default");
  const [ratingScore, setRatingScore] = useState(1);
  const [comment, setComment] = useState("");
  const [taDictionary, setTaDictionary] = useState<any>({});

  const [allEmails, setAllEmails] = useState<string[]>([]);
  const [allCourseNames, setAllCourseNames] = useState<string[]>([]);
  const [allTermYears, setAllTermYears] = useState<string[]>([]);
  const fetchTaData = async () => {
    try {
      const courseRes = await callBackend("/api/course");
      const courseData = (await courseRes.json())['courses']

      const taRes = await callBackend("/api/ta")
      const taData = (await taRes.json())['TAs']

      const getCoursesForTa = (ta_id) => {
        return courseData.filter(course => course.course_TA.filter(ta => ta._id === ta_id).length > 0)
      }
      const taDictionary = {}
      for (let ta of taData){
        taDictionary[ta.email] = getCoursesForTa(ta._id)
      }
      const taEmails = Object.keys(taDictionary)
      setTaDictionary(taDictionary)
      setAllEmails(taEmails)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTaData();
  }, []);

  useEffect(() => {
    let courseNames = [];
    if (taEmail !== "default") {
      courseNames = taDictionary[taEmail].map(course => course.course_name);
    }
    setAllCourseNames(courseNames);
  }, [taEmail, taDictionary]);

  useEffect(() => {
    let termYears = [];
    if (courseName !== "default") {
      termYears = taDictionary[taEmail].filter(course => course.course_name === courseName).map(el => el.term_year)
    }
    setAllTermYears(termYears);
  }, [courseName, taEmail, taDictionary]);

  const handleRatingScore = (score: number) => {
    setRatingScore(score);
  };
  const handleCommentChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setComment(event.target.value);
  };

  const createNewReview = () => {
    setIsSuccess(false);
    setTAEmail("default");
    setCourseName("default");
    setTermYear("default");
  };

  const isValidForm =
    termYear !== "default" && courseName !== "default" && taEmail !== "default";

  const submitRatingForm = async (e: any) => {
    e.preventDefault();
    if (isValidForm) {
      const course_number = taDictionary[taEmail].filter(course => course.course_name === courseName)[0].course_number
      try {
        const res = await callBackend("/api/ratings/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course_number: course_number,
            term_year: termYear,
            email: taEmail,
            rating_score: ratingScore,
            comment: comment,
          }),
        });

        if (res.status === 200) {
          setIsSuccess(true);
        } else {
          alert("Error while adding posting review.");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setRatingError(true);
    }
  };

  return (
    <>
      <div className="rate-ta-container">
        <div className="mb-4">
          <h1>Rate a TA</h1>
          <h6>
            Let your TAs know how they did! Remember to keep your comments
            constructive and respectful.
          </h6>
        </div>
        {!isSuccess && (
          <form onSubmit={submitRatingForm}>
            <h2>Registered Semester</h2>
            <Select
              label="TA Email"
              required={true}
              name="ta-email"
              id="ta-email"
              options={allEmails}
              value={taEmail}
              placeholder={
                taDictionary && Object.entries(taDictionary).length !== 0
                  ? "Select a TA email"
                  : "No available TA email"
              }
              disabled={taDictionary && Object.entries(taDictionary).length === 0}
              handleChange={setTAEmail}
            ></Select>
            <Select
              label="Course Registered"
              required={true}
              name="courseName"
              id="courseName"
              options={allCourseNames}
              value={courseName}
              handleChange={setCourseName}
              placeholder={
                taEmail !== "default"
                  ? "Select a course registered"
                  : "No available course registered"
              }
              disabled={taEmail === "default"}
            ></Select>
            <Select
              label="Term Year"
              required={true}
              name="term-year"
              id="term-year"
              options={allTermYears}
              value={termYear}
              handleChange={setTermYear}
              placeholder={
                courseName !== "default"
                  ? "Select a term year"
                  : "No available term years"
              }
              disabled={courseName === "default"}
            ></Select>
            <Rating
              label="Rating"
              required={true}
              id="rating"
              value={ratingScore}
              handleChange={handleRatingScore}
            ></Rating>
            <TextArea
              label="Comment"
              required={false}
              cols={29}
              rows={5}
              placeholder="Leave a note..."
              maxLength={140}
              id="comment"
              value={comment}
              handleChange={handleCommentChange}
            ></TextArea>
            {!isSuccess && (
              <div className="rate-ta-button-container">
                <Button value="Submit Review" type="submit"></Button>
              </div>
            )}
          </form>
        )}
        {ratingError && (
          <ErrorBox errorMessage="You must fill out all the required fields"></ErrorBox>
        )}
        {isSuccess && (
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-4">
              <img src={CheckIcon} height="20" alt="check-icon"></img>
              <div className="review-submitted-text">
                <b>Your review has been submitted!</b>
              </div>
            </div>
            <div className="rate-ta-button-container">
              <Button
                value="Create Another Review"
                type="primary"
                onClick={createNewReview}
              ></Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RateTA;
