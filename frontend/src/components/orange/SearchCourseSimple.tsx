import React, { useEffect, useState } from "react";
import { callBackend } from "../../apiConfig"; import Button from "../../common/Button";
import ErrorBox from "../../common/ErrorBox";
import Select from "../../common/Select";

const SearchCourseSimple = (props: {
    courseNumber: string;
    handleCourseNumber: React.Dispatch<React.SetStateAction<any>>;
    handleCourseSearchClick: React.Dispatch<React.SetStateAction<any>>;
    displayError: boolean;
}) => {

    const [allCourses, setDropDownCourses] = useState([]);

    //populate dropdown with existing courses from DB
    const fetchDropDownData = async () => {
        try {
            const res = await callBackend("/api/course/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            let courses = [];
            let term_years = [];
            data.courses.forEach(c => {
                courses.push((c.course_number));
                term_years.push((c.term_year));
            });
            setDropDownCourses(courses);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchDropDownData();
    }, []);

    return (
        <>
            <h1 className="">Search for a Course </h1>
            <div className="mb-3">
                <h4>Manage TA of a course by first selecting a course number and a term year.  </h4>
                <div>
                    <div>
                        <Select
                            label="Course Number"
                            required={false}
                            name="course_number"
                            id="course_number"
                            options={allCourses}
                            value={props.courseNumber}
                            handleChange={props.handleCourseNumber}
                        ></Select>
                    </div>
                </div>
                <div>
                    {props.displayError && (
                        <div>
                            <ErrorBox errorMessage="Course does not exist!"></ErrorBox>
                        </div>
                    )}
                    <div className="ta-admin-button-container">
                        <Button
                            width="15rem"
                            type="primary"
                            value="Search for Course"
                            onClick={props.handleCourseSearchClick}
                        ></Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchCourseSimple;
