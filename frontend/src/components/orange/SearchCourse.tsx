import React from "react";
import Button from "../../common/Button";
import LabeledInput from "../../common/LabeledInput";
import Select from "../../common/Select";

const SearchCourse = (props: {
    term_year: string;
    course_number: string;
    handleTermYear: React.Dispatch<React.SetStateAction<any>>;
    handleCourseNumber: React.Dispatch<React.SetStateAction<any>>;
    displayError: boolean;
}) => {
    const allTermYears = ["Fall2022", "Fall2023", "Winter2022", "Winter2023"];
    const allCourses = [
        "COMP307",
        "COMP462",
        "COMP598",
        "COMP360",
        "COMP303",
        "COMP302",
        "COMP432",
    ];

    return (
        <>
            <h1 className="">Manage a Course </h1>
            <div className="mb-3">
                <h4>Manage a course by first selecting a course number and a term year.  </h4>
                <div>
                    <div>
                        <Select
                            label="Term Year"
                            required={true}
                            name="term_year"
                            id="term_year"
                            options={allTermYears}
                            value={props.term_year}
                            handleChange={props.handleTermYear}
                            isMultiple={false}
                        ></Select>

                        <Select
                            label="Course Number"
                            required={true}
                            name="course_number"
                            id="course_number"
                            options={allCourses}
                            value={props.course_number}
                            handleChange={props.handleCourseNumber}
                            isMultiple={false}
                        ></Select>
                    </div>
                </div>


                <div>
                    <div>
                        <Button
                            width="15rem"
                            type="primary"
                            value="Search for Course"
                        //   onClick={props.handleCourseSearchClick}
                        ></Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchCourse;
