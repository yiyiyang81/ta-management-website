import React from "react";
import Button from "../../common/Button";
import ErrorBox from "../../common/ErrorBox";
import Select from "../../common/Select";

const SearchCourseSimple = (props: {
    courseNumber: string;
    handleCourseNumber: React.Dispatch<React.SetStateAction<any>>;
    handleCourseSearchClick: React.Dispatch<React.SetStateAction<any>>;
    displayError: boolean;
}) => {
    const allCourses = [
        "COMP307",
        "COMP310",
        "COMP462",
        "COMP598",
        "COMP360",
        "COMP303",
        "COMP302",
        "COMP432",
    ];

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
                    <div>
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
